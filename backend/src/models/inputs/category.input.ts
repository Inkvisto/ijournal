import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";


@InputType()
export class CategoryInput {

@Field()
@IsNotEmpty()
name:string;

@Field()
@IsNotEmpty()
image_url:string;
}