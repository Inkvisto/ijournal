import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";


@ArgsType()
export class CommentArgsId {
    @Field()
    @IsNotEmpty()
    commentId:string
}