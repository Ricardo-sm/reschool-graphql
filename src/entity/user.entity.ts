import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { IsEmail, MinLength, IsDate } from 'class-validator';
import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  CreateDateColumn,
  Unique,
  ManyToMany,
} from 'typeorm';
import { Room } from './room.entity';

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

@InputType()
export class CreateUser extends User {
  @Field(() => String)
  username!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;
}

@InputType()
export class LogInUser {
  @Field(() => String)
  @IsEmail()
  email!: string;

  @Field(() => String)
  @MinLength(8)
  password!: string;
}

@InputType()
export class DeleteUser {
  @Field(() => String)
  @MinLength(8)
  password!: string;

  @Field(() => String)
  @MinLength(8)
  passwordConfirm!: string;
}

@InputType()
export class UpdateUser {
  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => String, { nullable: true })
  @IsEmail()
  email?: string;

  @Field(() => String, { nullable: true })
  @MinLength(8)
  password?: string;

  @Field(() => String, { nullable: true })
  @MinLength(8)
  oldPassword?: string;
}
