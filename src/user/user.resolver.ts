import {
  Resolver,
  Query,
  Mutation,
  Args,
  InputType,
  Field,
} from '@nestjs/graphql';

import { User } from 'src/entity/user.entity';
import { UserService } from './user.service';
import { validate, IsEmail, MinLength } from 'class-validator';

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

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => Boolean)
  async createUser(@Args('user') user: CreateUser): Promise<boolean> {
    try {
      const newUser = await this.userService.create(user);

      const usedUsername = await this.userService.findByUsername(
        newUser.username,
      );
      if (usedUsername) throw new Error('Username is already used');

      const usedEmail = await this.userService.findByEmail(newUser.email);
      if (usedEmail) throw new Error('Email is alredy used');

      const hashPassword = await this.userService.hashPassword(
        newUser.password,
      );
      newUser.password = hashPassword;

      return await this.userService.save(newUser);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  @Mutation(() => Boolean)
  async updateUser(
    @Args('id') id: string,
    @Args('user') user: UpdateUser,
  ): Promise<boolean> {
    try {
      if (user.username) {
        const usedUsername = await this.userService.findByUsername(
          user.username,
        );
        if (usedUsername) throw new Error('Username is already used');
      }

      if (user.email) {
        const usedEmail = await this.userService.findByEmail(user.email);
        if (usedEmail) throw new Error('Email is alredy used');
      }

      if (user.oldPassword) {
        const match = await this.userService.matchPasword(id, user.oldPassword);

        if (match) {
          if (!user.password) throw new Error('New password required');

          const hashPassword = await this.userService.hashPassword(
            user.password,
          );
          user.password = hashPassword;
        } else {
          throw new Error("Passwords don't match");
        }
      }
      if (user.password && !user.oldPassword)
        throw Error('Confirm old password');

      return await this.userService.update(id, user);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  @Query(() => [User])
  getAllUsers() {
    return this.userService.findAll();
  }
}
