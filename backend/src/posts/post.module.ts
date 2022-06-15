import { PostResolver } from '../resolvers/post.resolver';
import { forwardRef, Module } from '@nestjs/common';
import { PostController } from 'src/posts/post.controller';
import { PostService } from 'src/posts/post.service';

import { AuthModule } from '../auth/auth.module';
import PostsSearchService from './postSearch.service';
import { SearchModule } from '../search/search.module';

import { CategoryModule } from '../category/category.module';
import { CategoryService } from '../category/category.service';




@Module({
  imports:[AuthModule,PostModule,CategoryModule],
  controllers:[PostController],
  providers: [PostResolver,PostService,CategoryService]
})

export class PostModule {}
