import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { User } from 'src/entity/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}
