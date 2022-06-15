import { forwardRef, HttpException, HttpStatus, Inject, Injectable, NotFoundException, Query, Req } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import {   Posts, Prisma, User } from '@prisma/client';
import { Request } from 'express';
import { PrismaService } from 'nestjs-prisma';


import { OrderDirection } from 'src/common/order/order-direction';
import { CategoryService } from '../category/category.service';
import { PostIdArgs } from '../models/args/post-id.args';
import { CategoryModel } from '../models/category.model';
import { CategoryInput } from '../models/inputs/category.input';
import { UserModel } from '../models/user.model';
import PostsSearchService from './postSearch.service';


@Injectable()
export class PostService{
    constructor(
      private prisma:PrismaService,
    //  private postsSearchService: PostsSearchService,
      private readonly categoryService:CategoryService
      ){}


    async findPosts(params: {
      take?: number;
      cursor?: Prisma.PostsWhereUniqueInput;
  }): Promise<Posts[]> {
      
    const { take, cursor } = params;

    if( cursor.id === '' ||  cursor.id === 'undefined' ){ 
    
      
      
      return  await this.prisma.posts.findMany({
      include: { author: true, comments: true }, 
      take
    })}
    else{
      this.prisma.posts.aggregate
    return  await this.prisma.posts.findMany({
      include: { author: true, comments: true }, 
      take, 
      skip:1,
      cursor
    })
  }
  }

async findTitles(params: {
  take?: number;
  cursor?: Prisma.PostsWhereUniqueInput;
}): Promise<any> {
  
const { take, cursor } = params;


if( cursor.id === '' ||  cursor.id === 'undefined' ){ 


  return  await this.prisma.posts.findMany({
  select:{
    title:true,
    id:true,
    _count:{
      select:{comments:true}
    }
  },
  take
})}
else{
  this.prisma.posts.aggregate
return  await this.prisma.posts.findMany({
  select:{
    title:true,
    id:true,
    _count:{
      select:{comments:true}
    }
  },
  take, 
  skip:1,
  cursor
})
}
}



    async findOne(id:PostIdArgs){
    try{
     const {categories,...post} = await this.prisma.posts.findUnique({where:{id:id.postId},include:{author:true,comments:true,categories:true},rejectOnNotFound:true})

      const categoryId = {categoryId:categories[0].categoryId}
    const category =  await this.categoryService.find(categoryId)

    return {post,category}
    
    } catch(err){
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    }

  
    async search(@Query() req:{title:string,content:string},res){
        const searchTitle = req.title
        const searchContent = req.content
       const filteredPosts = await this.prisma.posts.findMany({
         where: {
           title: { contains: searchTitle},
          
         }
       })
         res.send(filteredPosts)
      }

    findPopular(){
      return this.prisma.posts.findMany({
        orderBy:{
          likes:OrderDirection.desc
        }
      })
    }

    findNewest(){
      return this.prisma.posts.findMany({
        orderBy:[
          {createdAt:OrderDirection.desc},
          {updatedAt:OrderDirection.desc}
        ]
      })
  
    }



    async create(data:Prisma.PostsCreateInput,user:User):Promise<Posts>{
    
      const post:any = await this.prisma.posts.create({
        data:{
          title:data.title,
          content:data.content,
          published:true,
          author:{connect:{id:user.id}},
        },include:{author:true,categories:true}
      })
     
      // await this.postsSearchService.indexPost(post)
      return post
    }


    async deleteAll(){
      return this.prisma.posts.deleteMany()
    }
  


    /*async searchPosts(text:string) {
      const results = await this.postsSearchService.search(text);

      const ids = results.map(result=>{
    
      
        return result.id
    
    }
    );
      if(!ids.length){
        return [];
      }
    
      return this.prisma.posts.findMany({
        
        where:{id:{in:ids}}
      })
    }*/


    async updatePost(id:string,post:Prisma.PostsUpdateInput) {
      await this.prisma.posts.update({where:{
        id:id
      },
      data:post
    })
    const updatedPost = await this.prisma.posts.findUnique({where:{id:id}})
    if (updatedPost) {
      //await this.postsSearchService.update(updatedPost);
      return updatedPost;
    }
    throw new NotFoundException();
    }


    
    async deletePost(id:PostIdArgs){
      const deleteResponse = await this.prisma.posts.delete({
        where:{
          id:id.postId
        }
      })

     
     // await this.postsSearchService.remove(id.postId);

      return deleteResponse
    }


  async connectCategory(){

  }


  
   
  }