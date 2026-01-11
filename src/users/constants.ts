import 'dotenv/config';
import { env } from 'process';

if (!env['secretOrPrivateKey']) {
  throw new Error('Environment variable secretOrPrivateKey is not set.');
}

export const jwtConstants = {
  secret: env['secretOrPrivateKey'],
};
