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
  id: string;
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

  constructor(user: Partial<UserModel> | User,token?:Partial<Token>) {
    Object.assign(this, user, token);
  }
}
