import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/current-user.deco';

import { Room, CreateRoom } from '../entity/room.entity';
import { UserPayload } from '../auth/jwt.strategy';

import { RoomService } from './room.service';
import { JwtAuthGuard } from '../auth/jwt.auth';
import { GraphQLError } from 'graphql';
import { ApolloError } from 'apollo-server-express';

@Resolver(() => Room)
export class RoomResolver {
  constructor(private readonly roomService: RoomService) {}

  // Mutations

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async createRoom(
    @CurrentUser() currentUser: UserPayload,
    @Args('room') room: CreateRoom,
  ): Promise<boolean> {
    try {
      const newRoom = await this.roomService.create(room);

      const usedRoomName = await this.roomService.findByName(
        newRoom.roomName,
        currentUser.id,
      );

      if (usedRoomName) throw new ApolloError('Room name is already used');

      newRoom.teacherId = currentUser.id;

      return await this.roomService.save(newRoom);
    } catch (error) {
      throw error;
    }
  }

  // Queries
}
