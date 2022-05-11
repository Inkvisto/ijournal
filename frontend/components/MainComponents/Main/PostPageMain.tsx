import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Image from 'next/image';
import { Category } from '../../../utils/api/category/category.types';
import { Post } from '../../../utils/api/post/post.types';
import { minioImageLoader } from '../../../utils/constans/minioImageLoader';
import { dateDiffInDays, dateDiffInHours } from '../../../utils/time/isoToDate';
import styles from './PostPageMain.module.scss'


interface PostPageMainProps {
 post:Post
 category:Category
 posts:[Post]
    
}



const PostPageMain = ({post,posts,category}:Partial<PostPageMainProps>) => {


    const a = (createdAt:string) => new Date(createdAt);
    const  b = new Date();


  
    return(
        <div className={styles.block}>
            {post && category &&
            <>
            <div className={styles.postHeader}>
                <span>
                    <Image loader={minioImageLoader} src={category.image} alt='avatar_image_error' width={25} height={25} objectFit='cover' />
                <span>
                <div className={styles.username}>
                    {category.name}
                </div>
                <div className={styles.date}>
                {dateDiffInHours(a(post.createdAt), b)<24 ? (dateDiffInHours(a(post.createdAt), b)+' hours') : (dateDiffInDays(a(post.createdAt),b)+' days')
                } 
                </div>
                </span>
                
                </span>
                <MoreHorizIcon />
                </div>
                <div className={styles.postMain}>
                    {post.content}
                </div>
                </>
        }
        </div>
        
    )
}

export default PostPageMain