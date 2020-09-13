import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomResolver } from './room.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Room } from '../entity/room.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), AuthModule],
  providers: [RoomService, RoomResolver],
})
export class RoomModule {}
