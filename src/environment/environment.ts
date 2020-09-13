import { readFileSync } from 'fs';
import { join } from 'path';

export const environment = {
  PORT: process.env.PORT || 4000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/reschool',
  secretJwt: readFileSync(join(__dirname, '../keys/private.key')),
  publicJwt: readFileSync(join(__dirname, '../keys/public.key')),
};
