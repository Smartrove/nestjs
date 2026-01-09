import { env } from 'process';

export const jwtConstants = {
  secret: process.env.JWT_SIGN,
};
