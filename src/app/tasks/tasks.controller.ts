import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { UsersService } from '../users/users.service';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(
    private tasksService: TasksService,
    private usersService: UsersService,
  ) {
    // ...
  }

  @Get()
  async getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() userInfo,
  ): Promise<Task[]> {
    const user = await this.usersService.getUserById(userInfo.userId);
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  async getTaskById(
    @Param('id') id: string,
    @GetUser() userInfo,
  ): Promise<Task | null> {
    const user = await this.usersService.getUserById(userInfo.userId);
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() userInfo,
  ): Promise<Task> {
    const user = await this.usersService.getUserById(userInfo.userId);
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  async deleteTask(
    @Param('id') id: string,
    @GetUser() userInfo,
  ): Promise<void> {
    const user = await this.usersService.getUserById(userInfo.userId);
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() userInfo,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    const user = await this.usersService.getUserById(userInfo.userId);
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
