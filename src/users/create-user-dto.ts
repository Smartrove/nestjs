import { IsOptional } from 'class-validator';

export class CreateUserDTO {
  @IsOptional()
  firstName: string;
  @IsOptional()
  lastName: string;
}
