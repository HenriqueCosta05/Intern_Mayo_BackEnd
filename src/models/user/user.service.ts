import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class UserService implements UserRepository {
  create(user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findByUsername(username: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  update(user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
