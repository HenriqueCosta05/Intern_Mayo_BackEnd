import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { UserRepository } from './user.repository';
import { ErrorHelper } from 'src/common/helpers/responses/error.helper';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService implements UserRepository {
  constructor(private readonly _prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    try {
        user.password = await bcrypt.hash(user.password, 10);
        const createdUser = await this._prisma.user.create({
          data: {
            email: user.email,
            username: user.username,
            password: user.password,
          },
        });
        return createdUser;

        
      } catch(error) {
           throw ErrorHelper.generateError(
          'Dados de usuário não encontrados ou inválidos',
          400,
        );
    }
  }

  async findOne(id: string): Promise<User> {
    const user = this._prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (await user) {
      return Promise.resolve(user);
    } else {
      ErrorHelper.generateError('Usuário não encontrado', 404);
    }
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this._prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async update(id: string, user: User): Promise<User> {
    try {
      const updatedUser = await this._prisma.user.update({
        where: {
          id: id,
        },
        data: user,
      });
      return updatedUser;
    } catch (error) {
      console.error('Error ao atualizar usuário:', error);
      throw error;
    }
  }

  delete(id: string): Promise<User> {
    const deletedUser = this._prisma.user.delete({
      where: {
        id,
      },
    });
    return Promise.resolve(deletedUser);
  }
}