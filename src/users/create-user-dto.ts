import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';
import { Role } from 'src/roles/roles.enum';

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
  @IsOptional()
  @IsBoolean()
  blocked;
  @IsEnum(Role)
  @IsOptional()
  role;
}
