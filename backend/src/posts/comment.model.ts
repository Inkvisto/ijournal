import { Field, Int, ObjectType } from "@nestjs/graphql";

import { BaseModel } from "./base.model";
import { CommentsOnPostsModel } from "./comments-on-posts.model";
import { UserModel } from "./user.model";

@ObjectType()
export class CommentModel extends BaseModel{
 @Field(()=>Int)
 likes:number;
 @Field(()=>CommentsOnPostsModel)
 posts:CommentsOnPostsModel
 @Field()
 content:string;
 @Field(()=>UserModel)
 author:UserModel
 @Field()
 authorId:string
}
