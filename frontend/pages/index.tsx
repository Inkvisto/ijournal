import React from 'react'
import type {  NextPage } from 'next'
import { Api } from '../utils/api'
import { useRouter } from 'next/dist/client/router'
import { wrapper } from '../redux/store'
import Shell from '../components/ShellComponent'
import { User } from '../utils/api/user/user.types'
import { Post } from '../utils/api/post/post.types'
import { Category } from '../utils/api/category/category.types'
import { Commentary } from '../utils/api/comment/comment.types'
import { UserApi } from '../utils/api/user/user'
import { PostApi } from '../utils/api/post/posts'
import {  $postTitles, getPostsTitles } from '../effector/$post'
import { useStore } from 'effector-react'
import { CategoryApi } from '../utils/api/category/category'

interface UnionData {
  user:User,
  post:[Post],
  category:[Category],
  comments:[Commentary]
}

const Home:NextPage<UnionData> = () => {
  const [loading,setLoading] = React.useState(false);
  const router = useRouter();
  const [titles,setTitles] = React.useState()

React.useEffect(()=>{
 (async()=>{
  const postTitles:any = await PostApi.findTitles(4,'')
  getPostsTitles(postTitles)
  setTitles(postTitles)
 })()
},[]) 

  return (
   <Shell  key={router.asPath} loading={loading}  posts={titles}/>
 )
}



  
export default Home



