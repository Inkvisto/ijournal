import { Field, ObjectType } from "@nestjs/graphql";
import { CommentModel } from "./comment.model";
import { PostModel } from "./post.model";


@ObjectType()
export class CommentsOnPostsModel {

    @Field(()=>PostModel)
    post:PostModel;

    @Field(()=>CommentModel)
    comment:CommentModel;

    @Field()
    assignedAt:Date;

    @Field()
    assignedBy:string;
    
}