import { PrismaService } from 'nestjs-prisma';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import {
  Resolver,
  Query,
  Parent,
  Mutation,
  Args,
  ResolveField,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from '../decorators/user.decorator';
import { UserModel } from '../models/user.model';
import { ChangePasswordInput } from '../models/inputs/user-inputs/change-password.input';
import { UserService } from 'src/user/user.service';
import { UpdateUserInput } from '../models/inputs/user-inputs/update-user.input';

@Resolver(() => UserModel)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(
    private userService: UserService,
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
    return this.userService.updateUser(user.id, newUserData);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserModel)
  async changePassword(
    @UserEntity() user: UserModel,
    @Args('data') changePassword: ChangePasswordInput
  ) {
    return this.userService.changePassword(
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
