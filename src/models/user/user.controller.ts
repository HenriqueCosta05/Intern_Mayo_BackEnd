import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

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

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this._userService.update(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this._userService.delete(id);
  }
}
