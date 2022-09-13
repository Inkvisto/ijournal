import React from 'react'
import Link from 'next/link'
import type { NextPage } from 'next'

import { useRouter } from 'next/dist/client/router';

import styles from './SideBarCategories.module.scss'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import Image from 'next/image';

import { minioImageLoader } from '../../../utils/constans/minioImageLoader';
import { Category } from '../../../utils/api/category/category.types';
import { Button } from '@mui/material';
import { CategoryApi } from '../../../utils/api/category/category';
import { $user } from '../../../effector/$user';
import { useStore } from 'effector-react';
import { User } from '../../../utils/api/user/user.types';
import { $categories, getCategories } from '../../../effector/$categories';





type SideBarCategories = {
    getPullClick:(value:boolean)=>void
}





const SideBarCategories = ({getPullClick}:SideBarCategories) => {
    const[visible,setVisible] = React.useState(false)
    const [text,setText] = React.useState(true)
    const router = useRouter()

    const user = useStore($user)

    React.useEffect(()=>{
        getCategories()
    },[])
    const categories = useStore($categories)


  

    console.log(user);
    
  


    const change = () => {
           
        getPullClick(text)
        {!visible ? setVisible(true) : setVisible(false)}
     
        {!text ? setText(true) : setText(false)}
    }
   


  


    return(
        <>
        <ul>
          {{categories:user?.id ? user.categories: categories }.categories?.map((obj:Category)=>(
                    <li key={obj.id}>
                    <Link href={obj.id}>
                       <a>
                           <Button color='inherit' variant={router.asPath === obj.id ? 'contained' : 'text'} 
                              className={styles.button}>
                                  <Image loader={minioImageLoader} 
                                  layout='fixed' objectFit='cover' src={obj.image} width={25} height={25} alt='loading error' style={{position:'relative',borderRadius:'6px'}}  />
                                  <span>
                                   
                                  {obj.name}
                                  </span>
                              </Button>
                          </a>
                      </Link>
                  </li>
                   )
               
                  
               )}
               {/* {visible && (notVisibleGroups.map((obj:any)=>(
                   <li key={obj.id} className={styles.li}>
                        <Link href={obj.id}>
                           <a >
                               <Button variant={router.asPath === obj.id ? 'contained' : 'text'} 
                                  className={styles.button}>
                                      <Image  loader={minioImageLoader} src={obj.image} width={24} height={24} alt='loading error' style={{borderRadius:'6px'}} />
                                   <span>
                                   {obj.name}
                                   </span>
                               </Button>
                           </a>
                       </Link>
                   </li>
               )))}*/}
                <button onClick={change} className={styles.button}> 
               {visible ? <i><KeyboardArrowDownIcon className={styles.rotateArrow} /></i> : <i>< KeyboardArrowDownIcon/></i>}
               <span style={{margin:'10px',paddingBottom:'5px'}}>{text ? 'yet numbers' : 'pull up'}</span>
           </button>
           </ul>
          
                </>
    )
}



export default SideBarCategories


