import { PrismaService } from 'nestjs-prisma';
<<<<<<<< HEAD:src/user.resolver.ts
import { GqlAuthGuard } from '../guards/gql-auth.guard';
========
>>>>>>>> 7d9670b855cfe4c06a67beab30698f29fb923f17:src/users/users.resolver.ts
import {
  Resolver,
  Query,
  Parent,
  Mutation,
  Args,
  ResolveField,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
<<<<<<<< HEAD:src/user.resolver.ts
import { UserEntity } from '../decorators/user.decorator';
import { UserModel } from '../models/user.model';
import { ChangePasswordInput } from '../models/inputs/user-inputs/change-password.input';
import { UserService } from 'src/user/user.service';
import { UpdateUserInput } from '../models/inputs/user-inputs/update-user.input';
========
import { UserEntity } from 'src/common/decorators/user.decorator';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
>>>>>>>> 7d9670b855cfe4c06a67beab30698f29fb923f17:src/users/users.resolver.ts

@Resolver(() => UserModel)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService
  ) {}

  @Query(() => UserModel)
  async me(@UserEntity() user: UserModel): Promise<UserModel> {
    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserModel)
  async updateUser(
    @UserEntity() user: UserModel,
    @Args('data') newUserData: UpdateUserInput
  ) {
    return this.usersService.updateUser(user.id, newUserData);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserModel)
  async changePassword(
    @UserEntity() user: UserModel,
    @Args('data') changePassword: ChangePasswordInput
  ) {
    return this.usersService.changePassword(
      user.id,
      user.password,
      changePassword
    );
  }

  @ResolveField('posts')
  posts(@Parent() author: UserModel) {
    return this.prisma.user.findUnique({ where: { id: author.id } }).posts();
  }
}
