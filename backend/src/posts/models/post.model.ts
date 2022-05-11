<<<<<<< HEAD:src/models/post.model.ts
import { Field, ObjectType } from '@nestjs/graphql';

import { BaseModel } from './base.model';
import { Prisma, User } from '@prisma/client';
import { UserModel } from './user.model';
=======
import { ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';
import { BaseModel } from 'src/common/models/base.model';
>>>>>>> 7d9670b855cfe4c06a67beab30698f29fb923f17:src/posts/models/post.model.ts

@ObjectType()
export class PostModel {
  @Field()
  id:string
  @Field()
  title: string;
  @Field(type=>[String])
  content: string;
  @Field()
  published: boolean;
  @Field()
  authorId:string;
  @Field(type=>UserModel)
  author?:UserModel;
  @Field()
  likes: number;
  @Field({
    description: 'Identifies the date and time when the object was created.',
  })
  createdAt: Date;
  @Field({
    description:
      'Identifies the date and time when the object was last updated.',
  })
  updatedAt: Date;
}
