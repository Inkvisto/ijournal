import React from "react"
import Comment from "../../components/CommentModule/Comment"
import Shell from "../../components/ShellComponent"
import { Api } from "../../utils/api"
import { getServerSideProps } from ".."
import { User } from "../../utils/api/user/user.types"
import { Post, PostWithCategory } from "../../utils/api/post/post.types"
import { Category } from "../../utils/api/category/category.types"
import { Commentary } from "../../utils/api/comment/comment.types"
import { useRouter } from "next/router"


interface UnionData {
    user:User,
    posts:[Post],
    post:{post:Post,category:Category}
    category:[Category] & Category,
    comments:[Commentary]
  }

const PostPage = ({posts,comments,category}:UnionData) => {
    const [postData,setPostData] = React.useState<PostWithCategory>()
    const route = useRouter()


    
    
    React.useEffect(()=>{
    (async()=>{
    
        setPostData(await Api().post.getPost(route.asPath.slice(6)).catch((e)=>{
            route.replace('/404')
        }))
    
    })()
       
    },[])

  console.log(postData);
  
  return(
      <div>
{postData ? <div><Shell category={postData.category} post={postData.post} posts={posts} comments={comments} categories={category}/></div>:<div>

    </div>}
    <button onClick={(async()=>{Api().minio.uploadFile('')})}>12</button>
      </div>
  )
   


}

        
   


export default PostPage


export { getServerSideProps }



