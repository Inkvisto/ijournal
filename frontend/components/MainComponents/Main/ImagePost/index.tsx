import Image from "next/image";
import { minioImageLoader } from "../../../../utils/constans/minioImageLoader";
import styles from './ImagePost.module.scss'
interface imagePostProps {
    data:{
        caption:string;
        file:{
            url:string;
        }
        stretched:boolean;
        withBackground:boolean;
        withBorder:boolean;
    }
}


const ImagePost = ({data}:imagePostProps) => {

    const url = data.file.url
    const src = url.substring(url.lastIndexOf("/")+1,url.length)

    return(
       <figure >
         <div className={styles.imageContainer}>
            <Image loader={minioImageLoader} 
    layout="fill" src={src} alt="post_image_error" objectFit="cover" />
            </div>{
                data.caption &&  
                <figcaption>
                {data.caption}
               </figcaption>
            }
         
       </figure>
    )
}


export default ImagePost