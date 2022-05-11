import React from "react";
import styles from './Main.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PopularMain from "../PopularMain";
import MainSkeleton from "./MainSkeleton";
import { useRouter } from "next/router";
import { minioImageLoader } from "../../../utils/constans/minioImageLoader";
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { Post } from "../../../utils/api/post/post.types";
import { NextComponentType } from "next";
import { dateDiffInDays, dateDiffInHours } from "../../../utils/time/isoToDate";



interface MainProps {
    posts?:[Post];
    loading:boolean;
    serverError:boolean;
}





const Main = ({posts,loading,serverError}:MainProps) => {
  

    const[transitionStyles,setTransitionStyles] = React.useState(true)
    const pullUp = () => {
        {transitionStyles ? setTransitionStyles(false) : setTransitionStyles(true)}
    }

    

    const router = useRouter()

    const  inlineStyles = {
        maxHeight: {
            maxHeight:'10000px'
        },
        minHeight: {
            maxHeight:'70px',
        },
        maxTextOpacity: {
            opacity:1
        },
        minTextOpacity: {
            opacity:0,
        },
        buttonVisible: {
            opacity:1,
            height:0
        },
        buttonNotVisible:{
            height: 0,
            opacity:0,
        }
    }

   




   const PostsBlock = (<div>{posts && posts.map((obj:any)=>{



  console.log(obj);
  
   

   const a = new Date(obj.createdAt);
   const  b = new Date();
       

    
   
        return(
          
            <div key={obj.id}> 
            <Link href={`/post/${obj.id}`} key={obj.id}> 
            <ul className={styles.block}>
                <Image
                loader={minioImageLoader}
                width='50px' 
                height='50px'   
                objectFit="cover"
                alt="Picture of the category"
                src='7a627d0225e1f999d970495496fb2ca8.jpg'
                />
                 {obj.author.username}
                 <span className={styles.postDate}>{ dateDiffInHours(a, b)<24 ? (dateDiffInHours(a, b)+' hours') : (dateDiffInDays(a,b)+' days')} </span>
                         <p className={styles.title}>
                        {obj.title}
                        </p>
                <li>
                    <div className={styles.mainHeader}>
                     
        <div className={styles.comments} key={obj.id}>
                <a key={obj.id}>
                    <p className={styles.text}>
                        {obj.comments.map((e:any)=>(
                            <div>
                                {e.content}
                                <button>
                                    {e.likes}
                                </button>
                                </div>
                        ))}
                    </p>
                </a>
            
        </div>
        
                    </div> 
                    
                 </li>
            </ul>
            </Link>
            </div>
           
        )})}</div>)

   

    const TodayPopularTitles = (
            <div>
                <ul className={styles.block} 
                style={(transitionStyles) ? inlineStyles.maxHeight : inlineStyles.minHeight}>
                  
                <button onClick={pullUp} className={styles.pullUp}>
                                   pull up
                               </button>
                            
                       
                {posts && posts.map((obj:any)=>
                  
                 <div key={obj.id}>  <Link href={`/news/${obj.id}`} passHref>
                      <p className={styles.text} style={(transitionStyles) ? inlineStyles.maxTextOpacity: inlineStyles.minTextOpacity}>
                             {obj.title} <span className={styles.commentIcon}><ModeCommentOutlinedIcon fontSize='inherit' /> {obj.comments.length}</span>
        <p className={styles.commentsCount}  style={(transitionStyles) ? inlineStyles.maxTextOpacity: inlineStyles.minTextOpacity}>
            
                    
                           </p>
                         
                           </p>
                    </Link>
                         
                        
                   </div>
                 
                )}
                   <div>
                               <button className = {styles.moreButton} style={(transitionStyles) ? inlineStyles.buttonVisible: inlineStyles.buttonNotVisible}>Load More<KeyboardArrowDownIcon /></button>
                               
                           </div>
                    </ul>
            </div>
        )


        if(loading){
    return(
        <div><MainSkeleton /></div>
    )
  }else{

    return(
        <div>{posts !== undefined &&(
                <div className={styles.container}>
             {TodayPopularTitles}
             <div className={styles.popularMain}>
             <PopularMain />  
             </div> 
         
                 {PostsBlock}
                
                  </div>
            )
            }
           </div>     

    )

        }
}





export default Main