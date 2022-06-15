import { InputType, Field, HideField } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { Role } from 'src/models/user.model';
import { CreatePostInput } from 'src/models/inputs/createPost.input';

@InputType()
export class UserInput {
    @Field()
    id: string;
    @Field()
    email: string;
    @Field()
    username:string;
    @Field()
    role: Role;
    @Field(()=>CreatePostInput)
    posts: CreatePostInput;
    @HideField()
    @Exclude()
    password: string;
    @Exclude()
    @Field()
    refresh:string;
}
