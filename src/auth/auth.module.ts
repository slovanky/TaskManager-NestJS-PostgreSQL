import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repositiory';

@Module({
  imports: [TypeOrmModule.forFeature([User, UsersRepository])],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [TypeOrmModule],
})
export class AuthModule {
  // ...
}
