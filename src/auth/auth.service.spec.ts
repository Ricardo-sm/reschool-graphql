import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { environment } from '../environment/environment';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: environment.secretJwt,
          signOptions: { algorithm: 'RS256' },
        }),
      ],
      providers: [AuthService, JwtStrategy],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('auth service should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('jwt startegy should be defined', () => {
    expect(jwtStrategy).toBeDefined();
  });
});
