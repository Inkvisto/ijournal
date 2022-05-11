import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';


@ObjectType()
export class Token {
  @Field({ description: 'JWT access token' })
  @Expose()
  accessToken: string;

  @Field({ description: 'JWT refresh token' })
  refreshToken: string;

}
