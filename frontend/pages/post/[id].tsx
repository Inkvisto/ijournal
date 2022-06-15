import React from "react"
import Comment from "../../components/CommentModule/Comment"
import Shell from "../../components/ShellComponent"
import { Api } from "../../utils/api"

import { User } from "../../utils/api/user/user.types"
import { Post, PostWithCategory } from "../../utils/api/post/post.types"
import { Category } from "../../utils/api/category/category.types"
import { Commentary } from "../../utils/api/comment/comment.types"
import { useRouter } from "next/router"
import { PostApi } from "../../utils/api/post/posts"
import { useStore } from 'effector-react';
import { $post, $posts } from '../../effector/$post'


interface UnionData {
    user:User,
    posts:[Post],
    post:{post:Post,category:Category}
    category:[Category] & Category,
    comments:[Commentary]
  }

const PostPage = ({comments,category}:UnionData) => {

    const route = useRouter()
    

 

  return(
      <div>
 <div><Shell/></div>
    <button onClick={(async()=>{Api().minio.uploadFile('')})}>12</button>
      </div>
  )
   


}

        
   


export default PostPage






