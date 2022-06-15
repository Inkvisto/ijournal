import { PrismaService } from 'nestjs-prisma';
import { PaginationArgs } from '../common/pagination/pagination.args';
import { PostIdArgs } from '../models/args/post-id.args';
import { UserIdArgs } from '../models/args/user-id.args';
import {
  Resolver,
  Query,
  Parent,
  Args,
  ResolveField,
  Subscription,
  Mutation,
} from '@nestjs/graphql';
import { PostModel } from '../models/post.model';
import { PostOrder } from '../models/inputs/post-order.input';
import { PostConnection } from 'src/models/pagination/post-connection.model';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PubSub } from 'graphql-subscriptions/';
import { CreatePostInput } from '../models/inputs/createPost.input';
import { UserEntity } from 'src/decorators/user.decorator';
import { UserModel } from 'src/models/user.model';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

const pubSub = new PubSub();

@Resolver(() => PostModel)
export class PostResolver {
  constructor(private prisma: PrismaService) {}

  @Subscription(() => PostModel)
  postCreated() {
    return pubSub.asyncIterator('postCreated');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => [PostModel])
  async createPost(
    @UserEntity() user: UserModel,
    @Args('data') data: CreatePostInput
  ) {
    const newPost = this.prisma.posts.create({
      data: {
        published: true,
        title: data.title,
        content: data.content,
        authorId: user.id,
      },
    });
    pubSub.publish('postCreated', { postCreated: newPost });
    return newPost;
  }

  @Query(() => PostConnection)
  async publishedPosts(
    @Args() { after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({
      name: 'orderBy',
      type: () => PostOrder,
      nullable: true,
    })
    orderBy: PostOrder
  ) {
    const a = await findManyCursorConnection(
      (args) =>
        this.prisma.posts.findMany({
          include: { author: true },
          where: {
            published: true,
            title: { contains: query || '' },
          },
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : null,
          ...args,
        }),
      () =>
        this.prisma.posts.count({
          where: {
            published: true,
            title: { contains: query || '' },
          },
        }),
      { first, last, before, after }
    );
    return a;
  }

  @Query(() => [PostModel])
  userPosts(@Args() id: UserIdArgs) {
    return this.prisma.user
      .findUnique({ where: { id: id.userId } })
      .posts({ where: { published: true } });

    // or
    // return this.prisma.posts.findMany({
    //   where: {
    //     published: true,
    //     author: { id: id.userId }
    //   }
    // });
  }

  @Query(() => PostModel)
  async post(@Args() id: PostIdArgs) {
    return this.prisma.posts.findUnique({ where: { id: id.postId } });
  }

  @ResolveField('author')
  async author(@Parent() post: PostModel) {
    return this.prisma.posts.findUnique({ where: { id: post.id } }).author();
  }
}
