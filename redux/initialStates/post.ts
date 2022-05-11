import { PostDto } from "../../utils/api/types";
import { commentaryDefaultState } from "./commentary";
import { userDefaultState } from "./user";


export const postDefaultState: PostDto = {
   posts:{
    content:[''],
    title:'',
    published:false,
    authorId:'',
    cratedAt:'',
    id:'',
    updatedAt:'',
    views:0,
    author:userDefaultState.user,
    comments:commentaryDefaultState.commentary
   }
}
    