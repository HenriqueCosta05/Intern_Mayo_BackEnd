import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  status: string;

    @IsBoolean()
    @IsNotEmpty()
    completed: boolean;

}