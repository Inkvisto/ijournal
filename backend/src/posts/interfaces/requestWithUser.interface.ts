
import { User } from '@prisma/client';
import { Request } from 'express';
import { UserModel } from 'src/models/user.model';

 
interface RequestWithUser extends Request {
  user: User;
}
 
export default RequestWithUser;