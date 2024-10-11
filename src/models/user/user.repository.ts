import { User } from './user.entity';

export interface UserRepository {
  create(user: User): Promise<User>;
  findOne(id: string): Promise<User>;
  findByUsername(username: string): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}
