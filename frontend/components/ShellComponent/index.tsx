import React from 'react'
import SideComments from '../CommentModule/SideComments'
import Header from '../Header'
import styles from './Shell.module.scss'
import SideBar from '../SideBarComponents/SideBarContainer'
import Main from '../MainComponents/Main'
import { Post, PostWithCategory } from '../../utils/api/post/post.types'
import { Category } from '../../utils/api/category/category.types'
import { Commentary } from '../../utils/api/comment/comment.types'
import { useRouter } from 'next/router'
import PostPageMain from '../MainComponents/Main/PostPageMain'
import { UserApi } from '../../utils/api/user/user'


type MainProps = {
  posts:Post[],
  loading:any,
  categories:[Category]
  comments:[Commentary]
} 



const Shell = (props:Partial<MainProps> & Partial<PostWithCategory>) => {
    const[sideBarVisible,setSideBarVisible] = React.useState(true)

    const router = useRouter()


  const sideBarToggle =() =>{
    if(sideBarVisible === true){
      setSideBarVisible(false)
    }else{
      setSideBarVisible(true)
    }
  }

  const getToken = React.useCallback(
    () => UserApi.refresh(),
    []
  );
  
  React.useEffect(() => {
   setInterval(() => getToken(), 1000*60*15);
  }, [getToken]);

const ShellPathRender = React.useCallback(() => {
  switch (router.pathname) {   
    case '/post/[id]':
     return(
      <div className={styles.postPageMain}>
      <PostPageMain /> 
      </div>
     )
    case '/':
      return(
      <div className={styles.main}   >
         <Main />
      </div>
      )
    default:
      return(
      <div className={styles.main}>
      </div>
      )
  }
},[props])


  
    return(
        <div className={styles.container}>
          <div className={styles.sticky}>
           <Header menuClick={sideBarToggle} />
         {sideBarVisible ? <div className={styles.sidebar}>
          <SideBar categories={props.categories} />
          </div>: null}
        </div>
        {ShellPathRender()}
     <div className={styles.sidebarComments}>
     <SideComments comments={props.comments} />
     </div>
       
     
        
      </div>
    )
}

export default Shell