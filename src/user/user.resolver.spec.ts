import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';

describe('UserResolver', () => {
  let userResolver: UserResolver;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      providers: [UserResolver, UserService],
    }).compile();

    userResolver = module.get<UserResolver>(UserResolver);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userResolver).toBeDefined();
  });
});
