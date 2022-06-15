import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class validateInput {
    @Field()
    @IsNotEmpty()
    userId: string;
    @Field()
    iat:number;
    @Field()
    exp:number
}
