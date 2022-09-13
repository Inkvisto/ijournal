import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useStore } from 'effector-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { $post, $posts } from '../../../effector/$post';
import { Category } from '../../../utils/api/category/category.types';
import { Post } from '../../../utils/api/post/post.types';
import { PostApi } from '../../../utils/api/post/posts';
import { minioImageLoader } from '../../../utils/constans/minioImageLoader';
import { createdAtDifference, dateDiffInDays, dateDiffInHours } from '../../../utils/time/isoToDate';
import ImagePost from './ImagePost';
import ParagraphPost from './ParagraphPost';
import styles from './PostPageMain.module.scss'
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


import TextField from '@mui/material/TextField';
import { PostPageComments } from './PostPageComments';
interface PostPageMainProps {


}



const PostPageMain = () => {
    const [data, setData]: any = React.useState({ post: {}, category: { image: 'image' } })
    const router = useRouter()


    React.useEffect(() => {


        (async () => {
            router.query.id && setData(await PostApi.getPost(router.query.id))
        })()

    }, [router])





    const { post, category } = data;


    const parsedContent = () => {
        return post.content !== undefined ? JSON.parse(post.content) : []
    }






    const postBaseRender = (content: any) => {
        const res = []

        for (let obj of content) {

            switch (obj.type) {
                case "image":
                    res.push(<ImagePost data={obj.data} />)

                case "paragraph":
                    res.push(<ParagraphPost data={obj.data} />)

            }
        }
        return res


    }





    return (<>
        <main className={styles.block}>
            {data.post.comments &&
                <>
                    <div className={styles.postHeader}>

                        <span>
                            <Image loader={minioImageLoader} src={category.image} alt='avatar_image_error' width={25} height={25} objectFit='cover' />
                            <span>

                                <div className={styles.username}>
                                    {category.name}
                                </div>
                                <div className={styles.date}>
                                    {createdAtDifference(post)}
                                </div>
                            </span>

                        </span>
                        <MoreHorizIcon />
                    </div>

                    <div className={styles.postMain}>
                        <h1>
                            Title
                        </h1>

                        {postBaseRender(parsedContent())}

                    </div>
                    0 views
                    <footer >
                        <div className={styles.postFooter}>
                            <span>
                                <Link href='/#'>
                                    <a className={styles.comments}>
                                        <ModeCommentOutlinedIcon />

                                        <data>
                                            {post.comments.length}
                                        </data>

                                    </a>
                                </Link>

                                <Link href='/#'>
                                    <AutorenewIcon />
                                </Link>
                                <BookmarkBorderIcon />
                                <FileUploadIcon />
                            </span>
                            <article>
                                <div>
                                    <ArrowBackIosNewIcon />
                                </div>
                                <data>
                                    0
                                </data>
                                <div>
                                    <ArrowBackIosNewIcon />
                                </div>
                            </article>
                        </div>
                    </footer>
                </>
            }


        </main>
        <div className={styles.commentsBlock}>
            <PostPageComments post={post} />
        </div>

    </>
    )
}

export default PostPageMain

