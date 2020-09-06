import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectID } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User, UpdateUser, CreateUser } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async matchPasword(
    id: string | ObjectID,
    password: string,
  ): Promise<boolean> {
    const user = await this.findByID(id);
    const match = await bcrypt.compare(password, user.password);

    if (!match) return false;
    return true;
  }

  // Mutations

  async save(user: User): Promise<boolean> {
    const savedUser = await this.usersRepository.save(user);
    if (!savedUser) return false;
    return true;
  }

  async create(user: CreateUser): Promise<User> {
    return this.usersRepository.create(user);
  }

  async update(id: string, user: UpdateUser): Promise<boolean> {
    const updateResult = await this.usersRepository.update(id, user);
    if (!updateResult) return false;
    return true;
  }

  async remove(id: string): Promise<boolean> {
    const deleteResult = await this.usersRepository.delete(id);
    if (!deleteResult) return false;
    return true;
  }

  // Queries

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findByID(id: string | ObjectID): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ username });
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }
}
