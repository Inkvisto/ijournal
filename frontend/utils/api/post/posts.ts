import axios, { AxiosInstance } from 'axios'
import { useSelector } from 'react-redux';
import { Post, PostCreate } from './post.types';

const  baseURL = 'http://localhost:7777/'

export const PostApi = {
    async findPosts(take:number,cursor:string):Promise<any>{ 
      const {data} = await axios({method:'get',url:baseURL+`posts?take=${take}&cursor=${cursor}`,withCredentials:true});
      return data
    },
    async findTitles(take:number,cursor:string):Promise<any>{
      const {data} = await axios({method:'get',url:baseURL+`posts/titles?take=${take}&cursor=${cursor}`,withCredentials:true});
      return data
    },
    async createPost(dto:PostCreate):Promise<any>{      
        const {data} = await axios({method:'post',url:baseURL+'posts/create',withCredentials:true,data:dto})    
        return data
    },
    async getPost(id:string|string[]|undefined):Promise<any>{
      const {data} = await axios({method:'get',url:baseURL+`posts/${id}`,withCredentials:true})
      return data
    },
      async search(searchValue:string):Promise<any>{
        const {data} = await axios({method:'get',url:baseURL+`posts/findPost?search=${searchValue}`,withCredentials:true})
        return data
      },
  
  }

