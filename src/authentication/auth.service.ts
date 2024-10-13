import { Injectable } from '@nestjs/common';
import { UserService } from 'src/models/user/user.service';
import * as bcrypt from 'bcrypt';
import { ErrorHelper } from 'src/common/helpers/responses/error.helper';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private _userService: UserService,
    private _jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    if (!signInDto || !signInDto.email || !signInDto.password) {
      throw ErrorHelper.generateError('Dados de login inválidos', 400);
    }

    const user = await this._userService.findOneByEmail(signInDto.email);
    if (!user) {
      throw ErrorHelper.generateError('Usuário não encontrado', 404);
    }

    const isPasswordValid = await bcrypt.compare(signInDto.password, user.password);
    if (!isPasswordValid) {
      throw ErrorHelper.generateError('Credenciais inválidas', 401);
    }

    const payload = { sub: user.id, user };
    const access_token = await this._jwtService.signAsync(payload);
    return { access_token };
  }

  async signUp(signUpDto: SignUpDto): Promise<any> {
    if (!signUpDto || !signUpDto.email || !signUpDto.password) {
      throw ErrorHelper.generateError('Dados de cadastro inválidos', 400);
    }

    const user = await this._userService.findOneByEmail(signUpDto.email);
    if (user) {
      throw ErrorHelper.generateError('Usuário já cadastrado', 401);
    }

    const newUser: User = {
      id: '', 
      email: signUpDto.email,
      username: signUpDto.username,
      password: signUpDto.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const createdUser = await this._userService.create(newUser);
    const payload = { sub: createdUser.id, user: createdUser };
    const access_token = await this._jwtService.signAsync(payload);
    return { access_token };
  }
}
