import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './create-user-dto';
import { SignupResponse } from './user-response';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async signup(payload: CreateUserDTO): Promise<SignupResponse> {
    const encryptPassword = await this.hashpassword(payload.password);
    payload.password = encryptPassword;

    return this.prisma.user.create({
      data: payload,
      select: {
        email: true,
        id: true,
      },
    });
  }

  async hashpassword(plainText: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(plainText, salt);
  }
}
