import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from '../entity/user.entity';
import { getRepository, Repository } from 'typeorm';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User> = getRepository(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('user service should be defined', () => {
    expect(userService).toBeDefined();
  });
});
