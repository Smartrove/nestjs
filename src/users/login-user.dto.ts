import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  password: string;
}
