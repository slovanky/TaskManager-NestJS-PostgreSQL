import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {
    // ...
  }

  async signup(createUserDto: CreateUserDto) {
    // Check if user already exists
    const existingUser = await this.usersRepository.findOneByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Hash the password
    const hashedPassword = await this.hashPassword(createUserDto.password);

    // Create user with hashed password
    const user = await this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // Remove password from returned object
    const { password, ...result } = user;

    // Generate JWT token
    const token = this.generateToken(user.id, user.email);

    return {
      user: result,
      accessToken: token,
    };
  }

  async signin(loginDto: LoginDto) {
    // Find user by email
    const user = await this.usersRepository.findOneByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await this.comparePassword(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const token = this.generateToken(user.id, user.email);

    // Remove password from returned object
    const { password, ...result } = user;

    return {
      user: result,
      accessToken: token,
    };
  }

  async validateUser(userId: string) {
    return this.usersRepository.findOneById(userId);
  }

  private generateToken(userId: string, email: string) {
    const payload = { sub: userId, email };
    return this.jwtService.sign(payload);
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  private async comparePassword(
    enteredPassword: string,
    dbPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(enteredPassword, dbPassword);
  }
}
