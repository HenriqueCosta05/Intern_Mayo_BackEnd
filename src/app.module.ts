import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule, CacheStoreFactory } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './common/services/prisma.service';
import { UserController } from './models/user/user.controller';
import { AuthController } from './authentication/auth.controller';
import { AuthModule } from './authentication/auth.module';
import { UserModule } from './models/user/user.module';
import cache from './common/constants/cache';
import { redisStore } from 'cache-manager-redis-store';
import { TaskController } from './models/task/task.controller';
import { TaskModule } from './models/task/task.module';
import { AuthService } from './authentication/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TaskService } from './models/task/task.service';
import { UserService } from './models/user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [cache],
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          store: redisStore as unknown as CacheStoreFactory,
          host: configService.get('redis.host'),
          port: configService.get('redis.port'),
          ttl: 180 * 1000,
        };
      },
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    TaskModule,
  ],
  controllers: [AppController, UserController, AuthController, TaskController],
  providers: [AppService, PrismaService, AuthService, UserService, TaskService],
})
export class AppModule {}