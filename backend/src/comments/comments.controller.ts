import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards, CacheInterceptor, UseInterceptors, Inject, CACHE_MANAGER, CacheKey, CacheTTL, Query } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { find } from 'rxjs';

import { GET_COMMENTS_CACHE_KEY } from '../configs/redis.adapter';
import { UserEntity } from '../decorators/user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CommentArgsId } from '../models/args/comment-id.args';
import { PostIdArgs } from '../models/args/post-id.args';
import { UserIdArgs } from '../models/args/user-id.args';
import { CommentUpdateInput } from '../models/inputs/auth-inputs/comment.update';
import { UserModel } from '../models/user.model';
import { CommentsService } from './comments.service';
import { CommentInput } from './inputs/comments.input';


@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache) {}


   
@Get()
findAll(){
  return this.commentsService.getAll()
}

    
  

    @Get('/:commentId')
      find(@Param() id:CommentArgsId){
    
        
        return this.commentsService.getById(id)
      }
    


    @UseGuards(JwtAuthGuard)
    @Post('/create')
    create(@Body() commentInputData:CommentInput & PostIdArgs,@UserEntity() user:UserIdArgs) {

  
      return this.commentsService.create(commentInputData,user);
    }


  @Patch(':id')
  update(@Param('id') id: string,@Body() commentUpdateData:CommentUpdateInput) {
    return this.commentsService.update(id,commentUpdateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}


