import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO } from './create-user-dto';
import { SignupResponse } from './user-response';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { LoginUserDTO } from './login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

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

  async login(loginDTO: LoginUserDTO): Promise<{ accessToken: string }> {
    //check if user exist
    const user = await this.prisma.user.findFirst({
      where: {
        email: loginDTO.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    //decrypt user password for match
    const isMatched = await this.decryptPassword(
      loginDTO.password,
      user.password,
    );

    if (!isMatched) {
      throw new UnauthorizedException('Invalid Password');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        email: user.email,
        id: user.id,
      },
      { expiresIn: '7d' },
    );

    return { accessToken };
  }

  async hashpassword(plainText: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(plainText, salt);
  }
  async decryptPassword(plainText: string, hash: string) {
    return await bcrypt.compare(plainText, hash);
  }
}
