import axios from 'axios'
import { UserApi } from './user/user'
import { PostApi } from './post/posts'
import { CategoryApi } from './category/category'
import { CommentsApi } from './comment/comment'
import { MinioApi } from './minio/minio'


export type ApiReturnType = {
    user:ReturnType<typeof UserApi>;
    post:ReturnType<typeof PostApi>
}


export const Api = () => {

const instanse = axios.create({
    baseURL:'http://localhost:7777/',
    withCredentials:true
})

return{
    user:UserApi(instanse),
    post:PostApi(instanse),
    category:CategoryApi(instanse),
    comments:CommentsApi(instanse),
    minio:MinioApi(instanse)
}


}



