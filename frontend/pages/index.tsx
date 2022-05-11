import React from 'react'
import type {  NextPage } from 'next'
import { Api } from '../utils/api'

import { useRouter } from 'next/dist/client/router'
import App from 'next/app'
import { wrapper } from '../redux/store'
import { parseCookies } from 'nookies'
import { setUserData } from '../redux/slices/user'
import Shell from '../components/ShellComponent'
import PostPage from './post/[id]'
import { User } from '../utils/api/user/user.types'
import { Post } from '../utils/api/post/post.types'
import { Category } from '../utils/api/category/category.types'
import { Commentary } from '../utils/api/comment/comment.types'

interface UnionData {
  user:User,
  post:[Post],
  category:[Category],
  comments:[Commentary]
}

const Home:NextPage<UnionData> = ({user,post,category,comments}:UnionData) => {
  const [loading,setLoading] = React.useState(true);
  const [serverError,setServerError] = React.useState(false)
  const router = useRouter()




React.useEffect(()=>{
  if(post === null) router.replace('/500')
  setLoading(false)
},[post,category])

;

  return (
   <Shell  key={router.asPath} posts={post} categories={category} comments={comments} loading={loading} serverError={serverError} />
  )
}




export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx)=>{


  const token = ctx.req.cookies
  const accessToken = {accessToken:token.accessToken}
  const userData = await Api().user.getUser(accessToken)
  if(userData !== undefined) store.dispatch(setUserData(userData))
  
  const posts:[Post] = await Api().post.getAll()
  const categories:[Category] = await Api().category.getAll()
  const comments:[Commentary] = await Api().comments.getAll()
  



  return {
    props: {user:userData ?? null,post:posts ?? null,category:categories ?? null,comments:comments ?? null}, // will be passed to the page component as props
  

}


})






  
export default Home



