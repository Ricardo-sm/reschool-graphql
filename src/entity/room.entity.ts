import { ObjectType, Field, InputType, FieldOptions } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';
import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import { User } from './user.entity';

@ObjectType()
@Entity()
export class Room {
  @Field(() => String)
  @ObjectIdColumn()
  id: ObjectID;

  @Field(() => String)
  @ObjectIdColumn()
  teacherId!: ObjectID;

  @Field(() => String)
  @Column()
  roomName!: string;

  @Field(() => String)
  @Column()
  description!: string;

  @Field(() => Student)
  @Column(() => Student)
  students: Student[];
}

@InputType()
export class Student {
  @Field(() => String)
  @Column()
  @IsEmail()
  email!: string;

  @Field(() => String)
  @Column()
  username!: string;
}

@InputType()
export class CreateRoom extends Room {
  @Field(() => String)
  roomName!: string;

  @Field(() => String)
  description!: string;
}

@InputType()
export class UpdateRoom {
  @Field(() => String)
  roomName?: string;

  @Field(() => String)
  description?: string;
}
