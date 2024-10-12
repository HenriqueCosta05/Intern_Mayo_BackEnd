import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/common/services/prisma.service';

@Module({
    providers: [UserService, PrismaService],
})
export class UserModule {}
