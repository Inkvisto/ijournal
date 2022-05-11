import { number } from "yup"
import { postDefaultState } from "./post"
import { userDefaultState } from "./user"


export const categoryDefaultState = [
    {category:{
        categoryId:'',
        name:'',
        subscribers:0,
        posts:postDefaultState,
        image:'',
        author:userDefaultState
    }
}
]