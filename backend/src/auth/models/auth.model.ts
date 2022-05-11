import { ObjectType } from '@nestjs/graphql';
<<<<<<< HEAD:src/models/auth.model.ts
import { UserModel } from './user.model';
=======
import { User } from 'src/users/models/user.model';
>>>>>>> 7d9670b855cfe4c06a67beab30698f29fb923f17:src/auth/models/auth.model.ts
import { Token } from './token.model';

@ObjectType()
export class Auth extends Token {
  user?: UserModel;
}
