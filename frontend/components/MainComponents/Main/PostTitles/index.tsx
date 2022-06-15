import React from "react";

import { PostApi } from "../../../../utils/api/post/posts";

import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import styles from './Titles.module.scss'
import Link from "next/link";
import { getPostsTitles } from "../../../../effector/$post";



export const  Titles = () => {

    const [transitionStyles, setTransitionStyles] = React.useState(true)
    const [titles,setTitles]:any = React.useState()

    React.useEffect(()=>{
     (async()=>{
      const postTitles:any = await PostApi.findTitles(4,'')
      getPostsTitles(postTitles)
      setTitles(postTitles)
     })()
    },[]) 

    const pullUp = () => {

        { transitionStyles ? setTransitionStyles(false) : setTransitionStyles(true) }
    }

    
    const loadPostTitles = async () => {
        const nextPosts: any = await PostApi.findTitles(4, titles.at(-1)?.id)
        setTitles(titles.concat(nextPosts))        
        
    }
 
    return(
    <div >
        <ul className={styles.container} >

            <button onClick={pullUp} className={styles.pullUp}>
                pull up
            </button>


            {titles && titles.map((obj: any) =>

                <div key={obj.id}>  <Link href={`/news/${obj.id}`} passHref>
                    <p className={styles.text}>
                        {obj.title} <span className={styles.commentIcon}><ModeCommentOutlinedIcon fontSize='inherit' /> {obj._count.comments}</span>
                        <p className={styles.commentsCount}>


                        </p>

                    </p>
                </Link>


                </div>

            )}
            <div>
                <button className={styles.moreButton} onClick={loadPostTitles}>Load More<KeyboardArrowDownIcon /></button>

            </div>
        </ul>
    </div>
)
            }