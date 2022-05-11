import { Body, CacheInterceptor, Controller, Get, Param, Patch, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { Prisma, } from '@prisma/client';


import { PrismaService } from 'nestjs-prisma';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';


import { PostModel } from 'src/models/post.model';

import { AuthService } from 'src/auth/services/auth.service';


import { PostService } from 'src/posts/post.service';
import { CategoryService } from '../category/category.service';
import { PostIdArgs } from '../models/args/post-id.args';
import { UserEntity } from '../decorators/user.decorator';



@Controller('/posts')
export class PostController{
    constructor(private prisma:PrismaService,
      private postService:PostService,
      private authService:AuthService,
      private categoryService:CategoryService){}



     
     @Get()
    findAll(@Req() req){
     return this.postService.findAll()
    }



    @Get('/:postId')
    find(@Param() id:PostIdArgs){
      return this.postService.findOne(id)
    }
   

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async create(@Req() req,@Body() postData:Prisma.PostsCreateInput): Promise<PostModel>{

      const authorToken = req.cookies
     

      const user = await this.authService.getUserFromToken(authorToken)
     

      return this.postService.create(postData,user)
    }
    @UseGuards(JwtAuthGuard)
    @Post('/upload')
    @UseInterceptors(FileInterceptor('image',{
     dest:'./storage/'
      
    }))
    uploadFile(@UploadedFile() file:Express.Multer.File){
      return file
    }


    @Get('/findPost')
    async getPosts(@Query('search') search:string) {
   
      
      if (search) {
        return this.postService.searchPosts(search);
      }
      return this.postService.findAll();
    }


    @UseGuards(JwtAuthGuard)
    @Patch('/update')
    async updatePost(@Query('id') id:string, @Body() post:Prisma.PostsUpdateInput){
      
      
      return await this.postService.updatePost(id,post)
    }
    
    @UseGuards(JwtAuthGuard)
    @Post('/delete')
    async deletePost(@Body() id:PostIdArgs ){
      return await this.postService.deletePost(id)
    }

  

   

   /* async search(req,res){
        const searchTitle = req.query.title
        //const searchContent = req.query.content
       const filteredPosts = await this.postService.search(req,res)
         res.send(filteredPosts)
      }

      

    findPopular(){
      return this.postService.findPopular()
    }

    findNewest(){
      return this.postService.findNewest()
    }*/


   
  }