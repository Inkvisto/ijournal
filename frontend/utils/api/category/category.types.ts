import { BaseType } from "../../constans/base.type";
import { Post } from "../post/post.types";

export type CategoriesOnPosts = {
    postId:string;
    categoryId:string;
    assignedAt: string;
    assignedBy: string;
}

export type Category = {
    name:string;
    subscribers:number;
    authorId:string;
    image:string;
} & BaseType