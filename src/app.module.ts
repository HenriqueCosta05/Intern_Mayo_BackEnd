import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule, CacheStoreFactory } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './models/user/user.service';
import { PrismaService } from './common/services/prisma.service';
import { UserController } from './models/user/user.controller';
import { AuthController } from './authentication/auth.controller';
import { AuthModule } from './authentication/auth.module';
import { UserModule } from './models/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      store: redisStore as unknown as CacheStoreFactory,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
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
        AuthModule,
        UserModule,
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