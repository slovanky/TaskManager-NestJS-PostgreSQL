import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { Task, TaskStatus } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../users/user.entity';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {
    // ...
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task | null> {
    const found = await this.tasksRepository.getTaskById(id, user);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    try {
      await this.tasksRepository.deleteTask(id, user);
    } catch (error) {
      console.log(error);
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    try {
      return await this.tasksRepository.updateTaskStatus(id, status, user);
    } catch (error) {
      console.log(error);
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
