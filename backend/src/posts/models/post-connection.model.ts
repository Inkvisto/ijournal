import { ObjectType } from '@nestjs/graphql';
<<<<<<< HEAD:src/models/pagination/post-connection.model.ts
import PaginatedResponse from '../../common/pagination/pagination';
import { PostModel } from '../post.model';
=======
import PaginatedResponse from 'src/common/pagination/pagination';
import { Post } from './post.model';
>>>>>>> 7d9670b855cfe4c06a67beab30698f29fb923f17:src/posts/models/post-connection.model.ts

@ObjectType()
export class PostConnection extends PaginatedResponse(PostModel) {}
