import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { PrismaService } from 'src/common/services/prisma.service';

@Module({
  providers: [TaskService, PrismaService]
})
export class TaskModule {}
