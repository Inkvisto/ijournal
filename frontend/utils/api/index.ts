import axios from 'axios'
import { UserApi } from './user/user'
import { PostApi } from './post/posts'
import { CategoryApi } from './category/category'
import { CommentsApi } from './comment/comment'
import { MinioApi } from './minio/minio'





export const Api = () => {

const instanse = axios.create({
    baseURL:'http://localhost:7777/',
    withCredentials:true
})

return{
        comments:CommentsApi(instanse),
    minio:MinioApi(instanse)
}


}



