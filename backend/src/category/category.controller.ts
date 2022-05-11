import { Controller, Get, Post, Body, Param, Delete, UseGuards, Patch, UseFilters } from '@nestjs/common';
import { CategoryIdArgs } from '../models/args/category-id.args';
import { PostIdArgs } from '../models/args/post-id.args';
import { CategoryService } from './category.service';
import { UserEntity } from '../decorators/user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserIdArgs } from '../models/args/user-id.args';
import { UserModel } from '../models/user.model';
import { CategoryInput } from '../models/inputs/category.input';
import { CategoryModel } from '../models/category.model';
import { PrismaForeignKeyErrorFilter } from '../common/exception-filters/not-found-exception.filter';




@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService) {}

  
  @Get()
  findAll() {
      return this.categoryService.findAll();
  }

  @Get('/findConnectedPost')
  findPostswithCategory(){
    return this.categoryService.findPostsWithCategory()
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(
    @Body() categoryData:CategoryInput,
    @UserEntity() user: UserIdArgs) {

    return await this.categoryService.create(categoryData,user)
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(PrismaForeignKeyErrorFilter)
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
