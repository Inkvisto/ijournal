import { ObjectType } from '@nestjs/graphql';
import { UserModel } from './user.model';
import { Token } from './token.model';

@ObjectType()
export class Auth extends Token {
  user?: UserModel;
}
