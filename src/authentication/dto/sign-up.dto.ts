import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ description: 'O e-mail é especificado neste campo' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'O nome do usuário é especificado neste campo' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'A senha é é especificada neste campo' })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}