import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
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

  async findAll() {
    const category =  await this.prisma.category.findMany({
      select:{posts:{include:{post:true,category:true}}}
    })

    const categoriesWithPosts = []
    category.map((e)=>{
      categoriesWithPosts.push(...e.posts)
    })
   
   
return category


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




  create(category:CategoryInput,user:UserIdArgs) {
    return this.prisma.category.create({
      data:{
        subscribers:0,
        image:category.url,
        name:category.name,
        author:{
          connect:{
            id:user.userId
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
