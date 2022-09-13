import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry, Timeout } from '@nestjs/schedule';
import { User } from '@prisma/client';
import { Cache } from 'cache-manager';
import { PrismaService } from 'nestjs-prisma';

import { GET_COMMENTS_CACHE_KEY } from '../configs/redis.adapter';
import { CommentArgsId } from '../models/args/comment-id.args';
import { PostIdArgs } from '../models/args/post-id.args';
import { UserIdArgs } from '../models/args/user-id.args';
import { CommentModel } from '../models/comment.model';
import { CommentUpdateInput } from '../models/inputs/auth-inputs/comment.update';
import { UserModel } from '../models/user.model';
import { CommentInput } from './inputs/comments.input';


@Injectable()
export class CommentsService {
  constructor(
    private prisma:PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private schedulerRegistry: SchedulerRegistry,
    
  ){}
async getAll(){
  return await this.prisma.comment.findMany({include:{author:true}})
}

async getById(id:CommentArgsId){
  return await this.prisma.comment.findUnique({
    where:{
      id:id.commentId
    }
  })
}

  async clearCache() {
    const keys: string[] = await this.cacheManager.store.keys();
    keys.forEach((key) => {
      if (key.startsWith(GET_COMMENTS_CACHE_KEY)) {
        this.cacheManager.del(key);
      }
    })
  }


  async create(commentInputData:CommentInput & PostIdArgs,user:User) {
   
   
    return await this.prisma.comment.create({
      data:{
        content:commentInputData.content,
        author:{
          connect:{
            id:user.id
          }
        },
        posts:{
          connect:{
            id:commentInputData.postId
          }
        }
      }
    })

    
  }

  async saveMessage(id:string,likes:number) {

     return await this.prisma.comment.update({
      where:{
        id:id
      },
      data:{
        likes:likes
      }
    })
  }



  
  

  



 update(id: string,commentUpdateData:CommentUpdateInput) {
    return this.prisma.comment.update({
      where:{
        id:id
     },data:{
       likes:commentUpdateData.likes,
       content:commentUpdateData.content
     }
    })
  }

  async remove(id: number) {
    await this.clearCache();
    return `This action removes a #${id} comment`;
  }
}
