import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectID } from 'typeorm';

import { Room, UpdateRoom } from '../entity/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
  ) {}

  // Mutations

  async save(room: Room): Promise<boolean> {
    const savedRoom = await this.roomRepository.save(room);
    if (!savedRoom) return false;
    return true;
  }

  async create(room: Room): Promise<Room> {
    return this.roomRepository.create(room);
  }

  async update(id: ObjectID, room: UpdateRoom): Promise<boolean> {
    const updatedRoom = await this.roomRepository.update(id, room);
    if (!updatedRoom) return false;
    return true;
  }

  async remove(id: ObjectID): Promise<boolean> {
    const removeRoom = this.roomRepository.delete(id);
    if (!removeRoom) return false;
    return true;
  }

  // Queries

  findAllRooms(teacherId: ObjectID): Promise<Room[]> {
    return this.roomRepository.find({ teacherId });
  }

  findById(idRoom: ObjectID, teacherId: ObjectID): Promise<Room> {
    return this.roomRepository.findOne({ id: idRoom, teacherId });
  }

  findByName(roomName: string, teacherId: ObjectID): Promise<Room> {
    return this.roomRepository.findOne({ roomName, teacherId });
  }
}
