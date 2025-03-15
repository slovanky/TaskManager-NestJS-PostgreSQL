import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {
    // ...
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findOneById(id);

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    // Remove sensitive information before returning
    // const { password, ...result } = user;
    const { ...result } = user;

    return result as User;
  }

  // async getUserByEmail(email: string): Promise<User> {
  //   const user = await this.usersRepository.findOneByEmail(email);

  //   if (!user) {
  //     throw new NotFoundException(`User with email "${email}" not found`);
  //   }

  //   // Remove sensitive information before returning
  //   const { password, ...result } = user;

  //   return result as User;
  // }

  // async getAllUsers(skip = 0, take = 10): Promise<User[]> {
  //   const users = await this.usersRepository.find({
  //     skip,
  //     take,
  //     order: { createdAt: 'DESC' }
  //   });

  //   // Remove passwords from all users
  //   return users.map(user => {
  //     const { password, ...result } = user;
  //     return result as User;
  //   });
  // }

  // async createUser(createUserDto: CreateUserDto): Promise<User> {
  //   const { email, password } = createUserDto;

  //   // Check if email is already in use
  //   const existingUser = await this.usersRepository.findOneByEmail(email);
  //   if (existingUser) {
  //     throw new ConflictException(`Email "${email}" is already in use`);
  //   }

  //   // Hash the password
  //   const hashedPassword = await this.hashPassword(password);

  //   // Create the user
  //   const user = await this.usersRepository.create({
  //     ...createUserDto,
  //     password: hashedPassword,
  //   });

  //   // Remove sensitive information before returning
  //   const { password: _, ...result } = user;

  //   return result as User;
  // }

  // async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
  //   const user = await this.usersRepository.findOneById(id);

  //   if (!user) {
  //     throw new NotFoundException(`User with ID "${id}" not found`);
  //   }

  //   // If trying to update email, check if it's already in use by another user
  //   if (updateUserDto.email && updateUserDto.email !== user.email) {
  //     const existingUser = await this.usersRepository.findOneByEmail(updateUserDto.email);
  //     if (existingUser && existingUser.id !== id) {
  //       throw new ConflictException(`Email "${updateUserDto.email}" is already in use`);
  //     }
  //   }

  //   // If updating password, hash it
  //   if (updateUserDto.password) {
  //     updateUserDto.password = await this.hashPassword(updateUserDto.password);
  //   }

  //   // Update the user
  //   const updatedUser = await this.usersRepository.update(id, updateUserDto);

  //   // Remove sensitive information before returning
  //   const { password, ...result } = updatedUser;

  //   return result as User;
  // }

  // async deleteUser(id: string): Promise<{ message: string }> {
  //   const result = await this.usersRepository.delete(id);

  //   if (result.affected === 0) {
  //     throw new NotFoundException(`User with ID "${id}" not found`);
  //   }

  //   return { message: `User with ID "${id}" has been successfully deleted` };
  // }

  // async updatePassword(
  //   id: string,
  //   currentPassword: string,
  //   newPassword: string,
  // ): Promise<{ message: string }> {
  //   // We need the password for this operation so we use the repository directly
  //   const user = await this.usersRepository.findOneById(id);

  //   if (!user) {
  //     throw new NotFoundException(`User with ID "${id}" not found`);
  //   }

  //   // Verify current password
  //   const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  //   if (!isPasswordValid) {
  //     throw new BadRequestException('Current password is incorrect');
  //   }

  //   // Hash and update the new password
  //   const hashedPassword = await this.hashPassword(newPassword);
  //   await this.usersRepository.update(id, { password: hashedPassword });

  //   return { message: 'Password updated successfully' };
  // }

  // async toggleUserActiveStatus(id: string): Promise<User> {
  //   const user = await this.usersRepository.findOneById(id);

  //   if (!user) {
  //     throw new NotFoundException(`User with ID "${id}" not found`);
  //   }

  //   // Toggle the active status
  //   const updatedUser = await this.usersRepository.update(id, {
  //     isActive: !user.isActive
  //   });

  //   // Remove sensitive information before returning
  //   const { password, ...result } = updatedUser;

  //   return result as User;
  // }

  // private async hashPassword(password: string): Promise<string> {
  //   const salt = await bcrypt.genSalt();
  //   return bcrypt.hash(password, salt);
  // }
}
