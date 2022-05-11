import { BaseType } from "../../constans/base.type";
import { Post } from "../post/post.types";

export type CategoryOnPosts = {
    postId:string;
    categoryId:string;
    post:Post,
    category:Category
} & Pick<BaseType,'createdAt'|'updatedAt'>

export type Category = {
    name:string;
    subscribers:number;
    authorId:string;
    image:string;
} & BaseType