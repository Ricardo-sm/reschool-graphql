import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { environment } from '../environment/environment';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.auth';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: environment.secretJwt,
      signOptions: { algorithm: 'RS256' },
    }),
  ],
  exports: [AuthService],
  providers: [JwtStrategy, AuthService],
})
export class AuthModule {}
