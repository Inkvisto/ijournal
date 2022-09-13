import { ObjectType, registerEnumType, HideField, Field, ID } from '@nestjs/graphql';
import { PostModel } from './post.model';
import { BaseModel } from './base.model';
import { Exclude, Expose } from 'class-transformer';
import { Token } from './token.model';
import { User } from '@prisma/client';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
});


@ObjectType()
export class UserModel  {
  @Field(type=> ID)
  @Exclude()
  id: string;
  @Field()
  createdAt:Date;
  @Field()
  updatedAt:Date;
  @Field()
  email: string;
  @Field()
  username:string;
  @Field()
  @Exclude()
  role: Role;
  @Field(()=>[PostModel])
  posts?: PostModel[];
  @Exclude()
  password: string;
  @Exclude()
  refresh:string;
  @Field()
  avatar:string;
  

  constructor(user: User) {
    Object.assign(this, user);
  }
}
