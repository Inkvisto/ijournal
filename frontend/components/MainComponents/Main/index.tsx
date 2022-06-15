import React from "react";
import { minioImageLoader } from "../../../utils/constans/minioImageLoader";

import { Post } from "../../../utils/api/post/post.types";
import { dateDiffInDays, dateDiffInHours } from "../../../utils/time/isoToDate";
import ImagePost from "./ImagePost";
import { getPost } from "../../../effector/$post";
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import useFetch from "./useFetch";
import { useState, useCallback, useRef } from 'react';
import styles from './Main.module.scss'
import Link from 'next/link'
import Image from 'next/image'

import ToggleFilter from "../ToggleFilter";
import { Titles } from "./PostTitles";
import { useJSX } from "../../../utils/hooks/useJSX";
import ParagraphPost from "./ParagraphPost";
import category from "../../../redux/slices/category";


interface MainProps {
    postTitles: any;
    loading: boolean;
}

type PostPart = {
    id:string;
    type:string;
    data:{
        text:string;
    } & {
        caption:string;
        file:{
            url:string
        }
        scretched:boolean;
        withBackground:boolean;
        withBorder:boolean;
    }
}

const Main = () => {
    const [pageNum, setPageNum] = useState(1);
    const { isLoading, error, list, hasMore } = useFetch(pageNum);
    const [componentValue,setComponentValue]:any = useJSX()

    const observer = useRef<any>();
    const lastBookElementRef = useCallback(
        (node) => {
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPageNum((prev) => prev + 1);
                }
                if(!hasMore){
                    setComponentValue(
                        <div>
                            No more content
                        </div>
                    )
                    
                }
            });
            if (node) observer.current.observe(node);
        },
        [isLoading, hasMore]
    );

    return (
        <div> 
            <div className={styles.container}>
                <Titles />
                <div className={styles.popularMain}>
                    <ToggleFilter />
                </div>
                <div >{list.map((obj: Post) => {
                    const a = new Date(obj.createdAt);
                    const b = new Date();
                    console.log(obj);
                    
                    
                    const firstImage = JSON.parse(obj.content).find((e: PostPart) => e.type === 'image')
                    const postBaseRender = () => {
                        if (firstImage !== undefined) {
                            switch (firstImage.type) {
                                case "image":
                                    return <ImagePost data={firstImage.data} />
                                    break;
                               
                            }
                        }
                        else {
                            null
                        }
                    }

                    return (

                        <div key={obj.id} ref={lastBookElementRef} className={styles.posts}>
                             <article className={styles.post}>
                                    <div>
                                        {obj.author.avatar && <Image
                                            loader={minioImageLoader}
                                            width='50px'
                                            height='50px'
                                            objectFit="cover"
                                            alt="Picture of the category"
                                            src={obj.author.avatar}
                                        />}

                                        {obj.author.username}
                                        <span className={styles.postDate}>{dateDiffInHours(a, b) < 24 ? (dateDiffInHours(a, b) + ' hours') : (dateDiffInDays(a, b) + ' days')} </span>
                                        <p className={styles.title}>
                                            {obj.title}
                                        </p>
                                    </div>
                            <Link href={`/post/${obj.id}`} key={obj.id}><a>
                               


                                    {
                                        postBaseRender()
                                    }
                                
                            </a>
                            </Link>
                            <footer className={styles.postFooter}>
                                <span>
                                <Link href='/#'>
                            <a className={styles.comments}>
                                <ModeCommentOutlinedIcon  />
                                <span>
                                    {obj.comments.length}
                                </span>
                                </a>
                                    </Link>
                                    
                                <Link href='/#'>
                                    <AutorenewIcon />
                                </Link>
                                <BookmarkBorderIcon />
                                <FileUploadIcon />
                                </span>
                                <article>
                                    likes
                                </article>
                            </footer>
                            </article>
                        </div>

                    )
                })}</div>


                <div>{isLoading && 'Loading...'}</div>
                <div>{error && 'Error...'}</div>

            </div>

            {componentValue}
          
        </div>

    )


}





export default Main



