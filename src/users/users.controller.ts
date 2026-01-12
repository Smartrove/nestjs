import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from './create-user-dto';
import { UsersService } from './users.service';
import { LoginUserDTO } from './login-user.dto';
import { AuthGuard } from './auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';

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

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get('/user-profile')
  async getUserProfile(@Request() req) {
    return req.user;
  }
}
