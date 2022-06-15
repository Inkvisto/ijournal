import { Injectable } from '@nestjs/common';
import { Category, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CategoryIdArgs } from '../models/args/category-id.args';
import { UserIdArgs } from '../models/args/user-id.args';
import { CategoryModel } from '../models/category.model';
import { CategoryInput } from '../models/inputs/category.input';
import { UserModel } from '../models/user.model';
import { PostService } from '../posts/post.service';


@Injectable()
export class CategoryService {
  constructor(
    private readonly prisma:PrismaService,
  ){}

  async findCategories(param:{take?:number}):Promise<Category[]> {
    const {take} = param
   if(take === undefined){
    return await this.prisma.category.findMany()  
   }
   return await this.prisma.category.findMany({
    take
  })
  }

  async findSubscriptions(){
   // return await this.prisma.
  }


  find(id:CategoryIdArgs){
    return this.prisma.category.findUnique({
      where:{id:id.categoryId}
    })
  }

  async findPostsWithCategory(){
    return this.prisma.categoriesOnPosts.findMany({
      include:{post:true,category:true}
    })
  }

  async deleteAll(){
    return this.prisma.category.deleteMany()
  }




  create(category:CategoryInput,user:User) {
    return this.prisma.category.create({
      data:{
        subscribers:0,
        image:category.image_url,
        name:category.name,
        author:{
          connect:{
            id:user.id
          }
        },
        },
    })
  }


  async connectPost(postId:string,categoryId:string,user:UserModel){
    return this.prisma.categoriesOnPosts.create({
      data:{
        postId:postId,
        categoryId:categoryId,
        assignedBy:user.username
      },
      include:{post:true,category:true}
    })
  }

 

  update(id:CategoryIdArgs, updateCategoryData:CategoryModel) {
    return this.prisma.category.update({
      where:{
        id:id.categoryId
      },
      data:{
        name:updateCategoryData.name,
        image:updateCategoryData.image
      }
    })
  }

  remove(id: string) {
    return this.prisma.category.delete({
      where:{
        id:id
      }
    })
  }
}
