import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, MinLength, IsDate } from 'class-validator';
import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  CreateDateColumn,
  Unique,
} from 'typeorm';

@ObjectType()
@Entity()
@Unique(['username', 'email'])
export class User {
  @Field(() => String)
  @ObjectIdColumn()
  id: ObjectID;

  @Field()
  @Column({ name: 'username' })
  username!: string;

  @Field()
  @Column({ name: 'email' })
  @IsEmail()
  email!: string;

  @Field()
  @Column()
  @MinLength(8)
  password!: string;

  @Field(() => String)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: string;
}
