import {
  // Body,
  Controller,
  // Delete,
  // Get,
  // Param,
  // Patch,
  // Post,
  // Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
// import { User } from './user.entity';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { UpdatePasswordDto } from './dto/update-password.dto';
// import { PaginationDto } from './dto/pagination.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { GetUser } from '../auth/get-user.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {
    // ...
  }

  // @Get()
  // getAllUsers(@Query() paginationDto: PaginationDto): Promise<User[]> {
  //   const { skip, take } = paginationDto;
  //   return this.usersService.getAllUsers(skip, take);
  // }

  // @Get('/me')
  // getCurrentUser(@GetUser() userInfo): Promise<User> {
  //   return this.usersService.getUserById(userInfo.userId);
  // }

  // @Get('/:id')
  // getUserById(@Param('id') id: string): Promise<User> {
  //   return this.usersService.getUserById(id);
  // }

  // @Post()
  // createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
  //   return this.usersService.createUser(createUserDto);
  // }

  // @Patch('/:id')
  // updateUser(
  //   @Param('id') id: string,
  //   @Body() updateUserDto: UpdateUserDto,
  // ): Promise<User> {
  //   return this.usersService.updateUser(id, updateUserDto);
  // }

  // @Delete('/:id')
  // deleteUser(@Param('id') id: string): Promise<{ message: string }> {
  //   return this.usersService.deleteUser(id);
  // }

  // @Patch('/:id/password')
  // updatePassword(
  //   @Param('id') id: string,
  //   @Body() updatePasswordDto: UpdatePasswordDto,
  // ): Promise<{ message: string }> {
  //   const { currentPassword, newPassword } = updatePasswordDto;
  //   return this.usersService.updatePassword(id, currentPassword, newPassword);
  // }
}
