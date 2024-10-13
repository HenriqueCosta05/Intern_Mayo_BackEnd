import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { ValidationHelper } from 'src/common/helpers/exceptions/validation.helper';
import { PrismaService } from 'src/common/services/prisma.service';
import { UserRepository } from './user.repository';
import { ErrorHelper } from 'src/common/helpers/responses/error.helper';

@Injectable()
export class UserService implements UserRepository {
  constructor(private readonly _prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    console.log('Creating user:', user);
    try {
      if (ValidationHelper.isValidUser(user)) {
        const createdUser = await this._prisma.user.create({
          data: user,
        });
        return createdUser;
      } else {
        throw ErrorHelper.generateError(
          'Dados de usuário não encontrados ou inválidos',
          400,
        );
      }
    } catch (error) {
      console.error('Error ao criar usuário:', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<User> {
    const user = this._prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (ValidationHelper.isValidUser(await user)) {
      return Promise.resolve(user);
    } else {
      ErrorHelper.generateError('Usuário não encontrado', 404);
    }
  }


  async update(id: string, user: User): Promise<User> {
    try {
      if (ValidationHelper.isValidUser(user)) {
        const updatedUser = await this._prisma.user.update({
          where: {
            id: id,
          },
          data: user,
        });
        return updatedUser;
      } else {
        throw ErrorHelper.generateError(
          'Dados de usuário não encontrados ou inválidos',
          400,
        );
      }
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
