import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { User } from '../entity/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User], 'reschool'), AuthModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}
