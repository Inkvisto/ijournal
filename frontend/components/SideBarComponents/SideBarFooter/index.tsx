import React from 'react'
import Link from 'next/link'
import styles from './SideBarFooter.module.scss'

import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';

const links = [
    {id:1,href:'/advertise',name:'Order advertising'},
    {id:2,href:'/about',name:'About Project'},
    {id:3,href:'/vacancies',name:'Vacancies'},
    {id:4,href:'/rules',name:'Rules'},
    {id:5,href:'/help',name:'Help'},
    {id:6,href:'/sponsors',name:'Sponsors'}
]


type SideBarFooterProps = {
    footerStyles:string
}


const SideBarFooter = ({footerStyles}:SideBarFooterProps) => {
    
    const newPage = () => {
        return window.open('https://www.apple.com/store',"_blank")
    }
        
    return(
        <div className={styles[footerStyles]}>
           <ul>
               {links.map((link)=>(
                   <li key={link.id}>
                       <Link href={link.href}>
                           <a>{link.name}</a>
                       </Link>
                    </li>
               ))}
           </ul>
           <ul className={styles.iconList}>
               <li>
               <Link href='https://www.apple.com/store' passHref>
                <i><AppleIcon /></i>
                </Link>
               </li>
               <li>
                   <Link href='https://play.google.com/store' passHref>
                <i><AndroidIcon /></i>
                </Link>
               </li>
           </ul>
        </div>
    )
}


export default SideBarFooter

