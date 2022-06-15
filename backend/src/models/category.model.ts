import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { PostModel } from './post.model';
import { UserModel } from './user.model';

@ObjectType({ isAbstract: true })
export abstract class CategoryModel extends BaseModel{
 @Field(()=>Int)
 subscribers?:number;
 @Field(()=>PostModel)
 posts:PostModel
 @Field()
 postId:string;
 @Field()
 image:string;
 @Field(()=>UserModel)
 author:UserModel
 @Field()
 name:string
}
