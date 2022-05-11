import React from 'react'
import Link from 'next/link'
import type { NextPage } from 'next'

import { useRouter } from 'next/dist/client/router';

import styles from './SidebarCategories.module.scss'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import Image from 'next/image';

import { minioImageLoader } from '../../../utils/constans/minioImageLoader';
import { CategoryOnPosts } from '../../../utils/api/category/category.types';
import { Button } from '@mui/material';




const groups = [
    {image:'125bcaed-ac64-50ec-b412-3c7100d1bd73/-/scale_crop/64x64/-/format/webp/',text:'Ukraine',path:'/ua'},
    {image:'2810b9bb-071f-8a49-2290-2f92ca6797cd/-/scale_crop/64x64/-/format/webp/',text:'Internet',path:'/n'},
    {image:'74355c2a-cf87-ffba-aebf-45ae3bc8d1d8/-/scale_crop/64x64/-/format/webp/',text:'Memes',path:'/internet'},
    {image:'98aa07b9-378a-08b8-c4db-f9796f86b494/-/scale_crop/64x64/-/format/webp/',text:'Science',path:'/analysis'},
    {image:'a943773f-e9f6-b225-1bdf-417debc7647c/-/scale_crop/64x64/-/format/webp/',text:'Guest IJ',path:'/stories'}
   
]

const notVisibleGroups = [
    {image:'6b3d55b6-65a0-129c-18da-09ee4d987819/-/scale_crop/64x64/-/format/webp/',text:'Technologies',path:'/tech'},
    {image:'acd98182-a0f2-6b68-5bec-1f6d9d46e7fe/-/scale_crop/64x64/-/format/webp/',text:'Stories',path:'/guest'},  {image:'6b3d55b6-65a0-129c-18da-09ee4d987819/-/scale_crop/64x64/-/format/webp/',text:'Technologies',path:'/tech'},
    {image:'acd98182-a0f2-6b68-5bec-1f6d9d46e7fe/-/scale_crop/64x64/-/format/webp/',text:'Stories',path:'/guest'},  {image:'6b3d55b6-65a0-129c-18da-09ee4d987819/-/scale_crop/64x64/-/format/webp/',text:'Technologies',path:'/tech'},
    {image:'acd98182-a0f2-6b68-5bec-1f6d9d46e7fe/-/scale_crop/64x64/-/format/webp/',text:'Stories',path:'/guest'},  {image:'6b3d55b6-65a0-129c-18da-09ee4d987819/-/scale_crop/64x64/-/format/webp/',text:'Technologies',path:'/tech'},
    {image:'acd98182-a0f2-6b68-5bec-1f6d9d46e7fe/-/scale_crop/64x64/-/format/webp/',text:'Stories',path:'/guest'},
    {image:'6b3d55b6-65a0-129c-18da-09ee4d987819/-/scale_crop/64x64/-/format/webp/',text:'Technologies',path:'/tech'},
    {image:'acd98182-a0f2-6b68-5bec-1f6d9d46e7fe/-/scale_crop/64x64/-/format/webp/',text:'Stories',path:'/guest'},  {image:'6b3d55b6-65a0-129c-18da-09ee4d987819/-/scale_crop/64x64/-/format/webp/',text:'Technologies',path:'/tech'},
   
]

type SideBarCategories = {
    getPullClick:(value:boolean)=>void,
    categories:any
}





const SideBarCategories = ({getPullClick,categories}:SideBarCategories) => {
    const[visible,setVisible] = React.useState(false)
    const [text,setText] = React.useState(true)
    const router = useRouter()


    const change = () => {
           
        getPullClick(text)
        {!visible ? setVisible(true) : setVisible(false)}
     
        {!text ? setText(true) : setText(false)}
    }
   

  


    return(

        <div className={styles.container} >
            <ul>
              {categories && categories.map((obj:CategoryOnPosts)=>(
                        <li key={obj.categoryId}>
                        <Link href={obj.categoryId}>
                           <a>
                               <Button variant={router.asPath === obj.categoryId ? 'contained' : 'text'} 
                                  className={styles.button}>
                                      <Image loader={minioImageLoader} 
                                      layout='fixed' objectFit='cover' src={obj.category.image} width={25} height={25} alt='loading error' style={{position:'relative'}} /*style={{borderRadius:'6px'}}*/ />
                                   <span>
                                       
                                   {obj.category.name}
                                   </span>
                               </Button>
                           </a>
                       </Link>
                   </li>
                    )
                
                   
                )}
                 {visible && (notVisibleGroups.map((obj:any)=>(
                    <li key={obj.id} className={styles.li}>
                         <Link href={obj.id}>
                            <a >
                                <Button variant={router.asPath === obj.id ? 'contained' : 'text'} 
                                   className={styles.button}>
                                       <Image  loader={minioImageLoader} src={obj.image} width={24} height={24} alt='loading error' /*style={{borderRadius:'6px'}}*/ />
                                    <span>
                                    {obj.name}
                                    </span>
                                </Button>
                            </a>
                        </Link>
                    </li>
                )))}
            </ul>
            <button onClick={change} className={styles.button}> 
                {visible ? <i><KeyboardArrowDownIcon className={styles.rotateArrow} /></i> : <i>< KeyboardArrowDownIcon/></i>}
                <span style={{margin:'10px',paddingBottom:'5px'}}>{text ? 'yet numbers' : 'pull up'}</span>
            </button>
        </div>
    )
}



export default SideBarCategories