import { User } from "@prisma/client";

export interface UserRepository {
  create(user: User): Promise<User>;
  findOne(id: string): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
  update(id: string, user: User): Promise<User>;
  delete(id: string): Promise<User>;
}
