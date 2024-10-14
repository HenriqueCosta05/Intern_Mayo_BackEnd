import { Body, Controller, Delete, Get, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/authentication/auth.guard';
import { TaskService } from './task.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dtos/create-task.dto';

@UseGuards(AuthGuard)
@UseInterceptors(CacheInterceptor)
@Controller('task')
export class TaskController {
  constructor(private readonly _taskService: TaskService) {}

  @Get()
  async findAll() {
    return this._taskService.findAll();
  }

  @Get(':id')
  async findOne(id: string) {
    return this._taskService.findOne(id);
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this._taskService.create(createTaskDto);
  }

  @Put(':id')
  async update(id: string, task: any) {
    return this._taskService.update(id, task);
  }

  @Delete(':id')
  async delete(id: string) {
    return this._taskService.delete(id);
  }
}
