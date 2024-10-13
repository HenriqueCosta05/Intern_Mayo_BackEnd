import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private _userService: UserService) {}

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    return this._userService.create(user);
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this._userService.findOne(id);
  }

  @Get(':email')
  async getUserByEmail(@Param('email') email: string): Promise<User> {
    return this._userService.findOneByEmail(email);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this._userService.update(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this._userService.delete(id);
  }
}
