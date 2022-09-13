
import { Body, Controller, Get, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { DataNotFoundException } from 'src/common/exception-filters/not-found-exception.filter';
import { UserEntity } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CategoryIdArgs } from 'src/models/args/category-id.args';
import { UserIdArgs } from 'src/models/args/user-id.args';
import { UserModel } from 'src/models/user.model';

import { UserService } from 'src/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
) {}
 @Get()
 async findAll(){
   return await this.userService.getAll()
 }
 @Get()
 async findById(id:string){
   return await this.userService.getById(id)
 }

@UseGuards(JwtAuthGuard)
 @Get('/get')
 async getUser(@UserEntity() user:UserModel){ 
   try{
  return await this.userService.user({id:user.id})
   }catch(e){
     throw new NotFoundException(`User is not founded, most of all not loginned`)
   }
 }
 @UseGuards(JwtAuthGuard)
 @Patch('/subscribe')
 async subscribe(@Body() body:CategoryIdArgs, @UserEntity() user:UserModel){
   return await this.userService.subscribeToCategory(user.id,body.categoryId)
 }

 @UseGuards(JwtAuthGuard)
 @Patch('/unsubscribe')
 async unsubscribe(@Body() body:CategoryIdArgs, @UserEntity() user:UserModel){
   return await this.userService.unsubscribeToCategory(user.id,body.categoryId)
 }

}






    