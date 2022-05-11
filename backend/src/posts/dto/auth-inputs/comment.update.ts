import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CommentUpdateInput{
@Field()
content:string;
@Field(()=>Int)
likes:number;

}