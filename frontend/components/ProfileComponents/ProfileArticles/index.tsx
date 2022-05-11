import React from 'react'
import styles from './ProfileArticles.module.scss'
import { Button,Input,TextField } from '@mui/material'
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import AddLinkIcon from '@mui/icons-material/AddLink';
import Image from 'next/image';

interface ProfileArticlesProps {
    miniAvatar:string;
    avatarLoader:any;
}
const ProfileArticles:React.FC<ProfileArticlesProps> = ({miniAvatar,avatarLoader}) => {
    return(

        <div className={styles.container}>
            <div className={styles.addPostContainer}>
                <div className={styles.addPost}><i className={styles.miniAvatar}><Image src={miniAvatar} loader={avatarLoader} alt='profile_image_error' layout='responsive' objectFit='cover'  width='50px' height='50px' /></i><Input className={styles.input} fullWidth placeholder='Add post' /></div>
                <div className={styles.links}>
                <Button><i><AddAPhotoOutlinedIcon /></i><p>Photo and video</p></Button>
                <Button><i><AddLinkIcon /></i><p>Href</p></Button>
                </div>             
            </div>
            <div className={styles.createPost}>
                <span>If you have an interesting idea for an article, do not hesitate and <br /> start writing soon.</span>
                <Button>Create post</Button>
            </div>
        </div>
    )
}
 
export default ProfileArticles