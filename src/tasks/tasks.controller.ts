import {
  Body,
  Controller,
  // Delete,
  Get,
  Param,
  // Patch,
  Post,
  // Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
// import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
// import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private TasksService: TasksService) {
    //
  }

  // @Get()
  // getAllTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.TasksService.getTasksWithFilter(filterDto);
  //   } else {
  //     return this.TasksService.getAllTasks();
  //   }
  // }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.TasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.TasksService.createTask(createTaskDto);
  }

  // @Delete('/:id')
  // deleteTaskById(@Param('id') id: string): void {
  //   return this.TasksService.deleteTaskById(id);
  // }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  // ): Task {
  //   const { status } = updateTaskStatusDto;
  //   return this.TasksService.updateTaskStatus(id, status);
  // }
}
