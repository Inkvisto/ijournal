import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PostInput {
    @Field()
    @MaxLength(20)
    title: string;

    @Field(type => [String])
    content: string[];
}
