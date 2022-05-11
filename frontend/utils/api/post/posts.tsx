import axios, { AxiosInstance } from 'axios'
import { useSelector } from 'react-redux';
import { Post, PostCreate } from './post.types';





export const PostApi = (instanse:AxiosInstance) =>({    
    async getAll(){
        const {data}:any = {...await instanse.get('/posts').catch((error)=>{
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
              console.log(error.config);
        })}
        return data;
    },
    async createPost(dto:PostCreate):Promise<Post>{
        const {data} = await instanse.post<PostCreate,{data:Post}>('/posts/create',dto);
        return data;
    },
    async getPost(id:string | string[] | undefined){
        const {data} = await instanse.get(`/posts/${id}`)
        return data
    },
    async search(text:string){
        const {data} = await instanse.get(`/posts/findPost?search=${text}`)
        return data
    }
})
