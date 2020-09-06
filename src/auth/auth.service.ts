import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  createToken(user: User): string {
    return this.jwtService.sign({ id: user.id, email: user.email });
  }
}
