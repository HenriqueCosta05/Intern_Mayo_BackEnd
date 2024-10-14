import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/authentication/auth.guard';
import { TaskService } from './task.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { ErrorHelper } from 'src/common/helpers/responses/error.helper';

@UseGuards(AuthGuard)
@UseInterceptors(CacheInterceptor)
@Controller('task')
export class TaskController {
  constructor(private readonly _taskService: TaskService) {}

  @Get()
  async findAll() {
    try {
      return this._taskService.findAll();
    } catch (error) {
      ErrorHelper.handleError(error);
      return Promise.reject(error);
    }
  }

    @Get(':id')
    async findOne(@Param('id') id: string) {
      try {
        return this._taskService.findOne(id);
      } catch (error) {
        ErrorHelper.handleError(error);
        return Promise.reject(error);
      }
}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      return this._taskService.create(createTaskDto);
    } catch (error) {
      ErrorHelper.handleError(error);
      return Promise.reject(error);
    }
  }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
      try {
        const existingTask = await this._taskService.findOne(id);
        if (!existingTask) {
          return Promise.reject(null);
        }

        const updatedTaskData = {
          ...existingTask,
          ...updateTaskDto,
          updatedAt: new Date(),
        };

        return this._taskService.update(id, updatedTaskData);
      } catch (error) {
        ErrorHelper.handleError(error);
        return Promise.reject(error);
      }
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return this._taskService.delete(id);
    } catch (error) {
      ErrorHelper.handleError(error);
      return Promise.reject(error);
    }
  }
}
