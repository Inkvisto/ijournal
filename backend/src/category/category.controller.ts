import { Controller, Get, Post, Body, Param, Delete, UseGuards, Patch, UseFilters, UploadedFile, HttpException, HttpStatus, UseInterceptors, Query } from '@nestjs/common';
import { CategoryIdArgs } from '../models/args/category-id.args';
import { PostIdArgs } from '../models/args/post-id.args';
import { CategoryService } from './category.service';
import { UserEntity } from '../decorators/user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserIdArgs } from '../models/args/user-id.args';
import { UserModel } from '../models/user.model';
import { CategoryInput } from '../models/inputs/category.input';
import { CategoryModel } from '../models/category.model';

import { FileUploadService } from 'src/minio/image-upload.service';
import { BufferedFile } from 'src/models/file.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';




@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly fileUploadService: FileUploadService
    ) {}

  
  @Get()
  findAll(@Query('take') take: string,) {
      return this.categoryService.findCategories({take:Number(take)});
  }

  @Get('/findConnectedPost')
  findPostswithCategory(){
    return this.categoryService.findPostsWithCategory()
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(
    @Body() categoryData:CategoryInput,
    @UserEntity() user: User
    ) {
      
    return await this.categoryService.create(categoryData,user)
  }


  @UseGuards(JwtAuthGuard)
  @Post('/upload')
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@UploadedFile() file:BufferedFile){
    
    return this.fileUploadService.uploadSingle(file)
  }

  @Post('/deleteAll')
  deleteAll(){
    return this.categoryService.deleteAll()
  }
  

  @UseGuards(JwtAuthGuard)
  //@UseFilters(PrismaForeignKeyErrorFilter)
  @Post('/connectPost')
  async connectToCategory(
    @Body() connectionIds:PostIdArgs & CategoryIdArgs,
    @UserEntity() user:UserModel){

      
   
    return await this.categoryService.connectPost(connectionIds.postId,connectionIds.categoryId,user)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update/:id')
  async update(
    @Param('id') id:string,
    @Body() categoryUpdateData:CategoryModel
  ){
  
    const categoryId = {categoryId:id}

    return await this.categoryService.update(categoryId,categoryUpdateData)
  }


  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
