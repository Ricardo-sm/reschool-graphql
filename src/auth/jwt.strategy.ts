import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { environment } from '../environment/environment';

export class UserPayload {
  id: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: environment.publicJwt,
    });
  }

  async validate(payload: UserPayload): Promise<UserPayload> {
    try {
      if (!payload) throw new UnauthorizedException();

      return payload;
    } catch (error) {
      throw new Error(`Passport Error: ${error}`);
    }
  }
}
