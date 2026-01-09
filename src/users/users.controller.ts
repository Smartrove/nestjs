import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './create-user-dto';
import { UsersService } from './users.service';
import { LoginUserDTO } from './login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/create')
  async create(
    @Body()
    createUserDTO: CreateUserDTO,
  ) {
    return await this.usersService.signup(createUserDTO);
  }
  @Post('/login')
  async login(
    @Body()
    loginUserDTO: LoginUserDTO,
  ) {
    return await this.usersService.login(loginUserDTO);
  }
}
