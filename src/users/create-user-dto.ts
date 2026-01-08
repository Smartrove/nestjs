import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsOptional()
  firstName: string;
  @IsOptional()
  lastName: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
