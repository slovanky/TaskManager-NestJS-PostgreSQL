import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
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
import { User } from '../users/user.entity';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  private logger = new Logger('TasksController');

  constructor(
    private tasksService: TasksService,
    private usersService: UsersService,
  ) {
    // ...
  }

  @Get()
  async getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() userInfo: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User "${userInfo.email}" retreiving all tasks, Filters: ${JSON.stringify(filterDto)}`,
    );

    const user = await this.usersService.getUserById(userInfo.id);
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  async getTaskById(
    @Param('id') id: string,
    @GetUser() userInfo: User,
  ): Promise<Task | null> {
    const user = await this.usersService.getUserById(userInfo.id);
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() userInfo: User,
  ): Promise<Task> {
    this.logger.verbose(
      `user "${userInfo.email}" creating a new task, Data: ${JSON.stringify(createTaskDto)}`,
    );

    const user = await this.usersService.getUserById(userInfo.id);
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  async deleteTask(
    @Param('id') id: string,
    @GetUser() userInfo: User,
  ): Promise<void> {
    const user = await this.usersService.getUserById(userInfo.id);
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() userInfo: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    const user = await this.usersService.getUserById(userInfo.id);
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
