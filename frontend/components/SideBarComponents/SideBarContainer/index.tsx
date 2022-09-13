import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router';
import styles from './SideBar.module.scss'
import SidebarCategories from '../SidebarCategories';
import SideBarFooter from '../SideBarFooter';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ListIcon from '@mui/icons-material/List';
import { Button } from "@mui/material";
import { ThemeProvider } from '@emotion/react';
import { Category } from '../../../utils/api/category/category.types';
import { $user } from '../../../effector/$user';
import { useStore } from 'effector-react';


const menu = [
    {icon:<LocalFireDepartmentOutlinedIcon />,text:'Popular',path:'/'},
    {icon:<AccessTimeIcon />,text:'Newest',path:'/newest'},
    {icon:<TrendingUpIcon />,text:'Rating',path:'/rating'},
    {icon:<ListIcon />,text:'Subscriptions',path:'/subcriptions'}
]


const SideBar = () => {

    const [actionScroll,setActionScroll] = React.useState(false)
    const [scrollStyles,setScrollStyles] = React.useState({})
    const getCategoriesOpenValue = (value:boolean) =>{
        setActionScroll(value)
    }
    const [footerStyles,setFooterStyles] = React.useState('container')


    React.useEffect(()=>{
        
        
        if(actionScroll === true){
            setScrollStyles({height:'92vh',overflowY:'scroll',width:'218px'})
            setFooterStyles('animationContainer')
        }else if(actionScroll === false){
            setScrollStyles({})
            setFooterStyles('container')
        }   
        
    },[actionScroll])
    


    const router = useRouter()



    
    return(

        <div className={styles.container} >
            <div style={scrollStyles} className={styles.scrollBar}>
            <ul>
                {menu.map((obj)=>(
                    <li key={obj.path} className={styles.li}>
                         <Link href={obj.path}>
                            <a >
                                <Button color='inherit' variant={router.asPath === obj.path ? 'contained' : 'text'} 
                                   className={styles.button}>
                                    {obj.icon}
                                    <span>
                                    {obj.text}
                                    </span>
                                </Button>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
  
                <SidebarCategories getPullClick={getCategoriesOpenValue} />
            
           
           <SideBarFooter  footerStyles={footerStyles}/>
           
            </div>
           
        </div>
    )
}



export default SideBar