import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}