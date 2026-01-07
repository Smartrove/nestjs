import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './create-user-dto';

@Controller('users')
export class UsersController {
  @Post('/create')
  create(
    @Body()
    createUserDTO: CreateUserDTO,
  ) {
    return createUserDTO;
  }
}
