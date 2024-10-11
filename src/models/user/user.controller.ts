import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private _userService: UserService) {}

  @Get(':username')
  async getUser(@Param() username: string): Promise<User> {
    return this._userService.findByUsername(username);
  }

  @Post()
  async createUser(user: User): Promise<User> {
    return this._userService.create(user);
  }

  @Put()
  async updateUser(user: User): Promise<User> {
    return this._userService.update(user);
  }

  @Delete()
  async deleteUser(id: string): Promise<void> {
    return this._userService.delete(id);
  }
}
