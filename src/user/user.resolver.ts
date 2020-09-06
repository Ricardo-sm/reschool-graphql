import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CurrentUser } from 'src/auth/current-user.deco';
import { JwtAuthGuard } from 'src/auth/jwt.auth';
import {
  User,
  CreateUser,
  LogInUser,
  UpdateUser,
  DeleteUser,
} from '../entity/user.entity';
import { UserPayload } from '../auth/jwt.strategy';

import { AuthService } from 'src/auth/auth.service';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  // Mutations

  @Mutation(() => Boolean)
  async createUser(@Args('user') user: CreateUser): Promise<boolean> {
    try {
      const newUser = await this.userService.create(user);

      const usedUsername = await this.userService.findByUsername(
        newUser.username,
      );
      if (usedUsername) new Error('Username is already used');

      const usedEmail = await this.userService.findByEmail(newUser.email);
      if (usedEmail) new Error('Email is alredy used');

      const hashPassword = await this.userService.hashPassword(
        newUser.password,
      );
      newUser.password = hashPassword;

      return await this.userService.save(newUser);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async updateUser(
    @CurrentUser() currentUser: UserPayload,
    @Args('user') user: UpdateUser,
  ): Promise<boolean> {
    try {
      if (Object.entries(user).length === 0)
        new Error('No fields were updated');

      if (user.username) {
        const usedUsername = await this.userService.findByUsername(
          user.username,
        );
        if (usedUsername) new Error('Username is already used');
      }

      if (user.email) {
        const usedEmail = await this.userService.findByEmail(user.email);
        if (usedEmail) new Error('Email is alredy used');
      }

      if (user.oldPassword) {
        const match = await this.userService.matchPasword(
          currentUser.id,
          user.oldPassword,
        );

        if (match) {
          if (!user.password) new Error('New password required');

          const hashPassword = await this.userService.hashPassword(
            user.password,
          );
          user.password = hashPassword;
        } else {
          new Error("Passwords don't match");
        }
      }
      if (user.password && !user.oldPassword) new Error('Confirm old password');

      return await this.userService.update(currentUser.id, user);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteUser(
    @CurrentUser() currentUser: UserPayload,
    @Args('deleteUser') deleteUser: DeleteUser,
  ) {
    try {
      if (deleteUser.password != deleteUser.passwordConfirm)
        new Error("Passwords don't match");

      const match = await this.userService.matchPasword(
        currentUser.id,
        deleteUser.password,
      );
      if (!match) new Error('Incorrect password');

      return await this.userService.remove(currentUser.id);
    } catch (error) {
      throw error;
    }
  }

  // Queries

  @Query(() => String)
  async logIn(@Args('user') userArg: LogInUser): Promise<string> {
    try {
      const user = await this.userService.findByEmail(userArg.email);
      if (!user) new Error('Incorrect email or password');

      const matchPasword: boolean = await this.userService.matchPasword(
        user.id,
        userArg.password,
      );
      if (!matchPasword) new Error('Incorrect email or password');

      return this.authService.createToken(user);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [User])
  getAllUsers() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User)
  async getOneUser(@CurrentUser() currentUser: UserPayload): Promise<User> {
    return await this.userService.findByID(currentUser.id);
  }
}
