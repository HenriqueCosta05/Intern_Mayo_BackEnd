import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule, CacheStoreFactory } from '@nestjs/common/cache';
import * as redisStore from 'cache-manager-redis-store';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor } from '@nestjs/common/cache';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './models/user/user.service';
import { PrismaService } from './common/services/prisma.service';
import { UserController } from './models/user/user.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, PrismaService],
})
export class AppModule {
  static forRoot(options: { db: number }): DynamicModule {
    return {
      module: AppModule,
      imports: [
        ConfigModule.forRoot(),
        CacheModule.register({
          store: redisStore as unknown as CacheStoreFactory,
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
          isGlobal: true,
          db: options.db,
        }),
      ],
      controllers: [],
      providers: [
        {
          provide: APP_INTERCEPTOR,
          useClass: CacheInterceptor,
        },
      ],
    };
  }
}