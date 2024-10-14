import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma.service';
import { ErrorHelper } from 'src/common/helpers/responses/error.helper';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Injectable()
export class TaskService implements TaskRepository{
    constructor(private _prisma: PrismaService) {}
                                async create(taskDto: CreateTaskDto): Promise<Task> {
                    if (
                        !taskDto ||
                        !taskDto.title ||
                        !taskDto.description ||
                        !taskDto.status ||
                        !taskDto.userId
                    ) {
                        const errorMessage = 'Invalid object';
                        console.error(errorMessage);
                        ErrorHelper.generateError(errorMessage, 400);
                        return Promise.reject(new Error(errorMessage));
                    }
                
                    try {
                        const userExists = await this._prisma.user.findUnique({
                            where: { id: taskDto.userId }
                        });
                
                        if (!userExists) {
                            const errorMessage = 'User not found';
                            console.error(errorMessage);
                            ErrorHelper.generateError(errorMessage, 404);
                            return Promise.reject(new Error(errorMessage));
                        }
                
                        const createdTask = await this._prisma.task.create({
                            data: {
                                title: taskDto.title,
                                description: taskDto.description,
                                status: taskDto.status,
                                user: {
                                    connect: { id: taskDto.userId }
                                }
                            }
                        });
                
                        console.log(createdTask);
                        return Promise.resolve(createdTask);
                    } catch (error) {
                        console.error('An error occurred:', error);
                        ErrorHelper.generateError(`An error occurred: ${error.message}`, 400);
                        return Promise.reject(error);
                    }
                }
    async findOne(id: string): Promise<Task> {
        try {
            const task = await this._prisma.task.findUnique({
                where: {
                    id
                }
            });
            if(!task) {
                            ErrorHelper.generateError(
                              `Tarefa com id: ${id} não encontrada`,
                              404,
                            );
                            return Promise.reject(null)
            }
            return Promise.resolve(task);
        } catch (error) {
            ErrorHelper.generateError(`Ocorreu um erro: ${error}`, 400);
            return Promise.reject(null);
        }
    }
   
        async findAll(): Promise<Task[]> {
        try {
            const tasks = await this._prisma.task.findMany();
            if (!tasks || tasks.length === 0) {
                const errorMessage = 'Nenhuma tarefa encontrada';
                ErrorHelper.generateError(errorMessage, 404);
                return Promise.reject(new Error(errorMessage));
            }
            return Promise.resolve(tasks);
        } catch (error) {
            console.error('An error occurred:', error);
            ErrorHelper.generateError(`Ocorreu um erro: ${error.message}`, 500);
            return Promise.reject(error);
        }
    }

    async update(id: string, task: UpdateTaskDto): Promise<Task> {
        try {
            const updatedTask = await this._prisma.task.update({
                where: {
                    id
                },
                data: {
                    title: task.title,
                    description: task.description,
                    status: task.status
                }
            });
            return Promise.resolve(updatedTask);
        } catch (error) {
            ErrorHelper.generateError(`Ocorreu um erro: ${error}`, 400);
            return Promise.reject(null);
        }
    }

    async delete(id: string): Promise<Task> {
        try {
            const deletedTask = await this._prisma.task.delete({
                where: {
                    id
                }
            });
            return Promise.resolve(deletedTask);
        } catch (error) {
            ErrorHelper.generateError(`Ocorreu um erro: ${error}`, 400);
            return Promise.reject(null);
        }
    }
}
