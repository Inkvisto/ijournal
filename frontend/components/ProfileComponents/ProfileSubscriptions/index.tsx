import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './ProfileSubscriptions.module.scss'

const subscribes = [
    {id:1,icon:'/3461f075-5654-8624-9ea5-e35f35126fd8/-/scale_crop/108x108/-/format/webp/',text:'Telegram'},
    {id:2,icon:'/8e52c2d8-3248-2b70-5942-90d1d6b6ea8c/-/scale_crop/108x108/-/format/webp/',text:'Memes'},
    {id:3,icon:'/a943773f-e9f6-b225-1bdf-417debc7647c/-/scale_crop/108x108/-/format/webp/',text:'Navigator'},
    {id:4,icon:'/b5dd5863-6867-44ab-498f-b98e45ad142a/-/scale_crop/108x108/-/format/webp/',text:'Science'},
    {id:5,icon:'/74355c2a-cf87-ffba-aebf-45ae3bc8d1d8/-/scale_crop/64x64/-/format/webp/',text:'Memes'}
]

const ProfileSubscriptions = () => {

    const number = 10
    return(
        <div className={styles.subscribeContainer}>
            <div className={styles.subscribers}>Subscribers<p className={styles.subscribersText}>You don&apos;t have a subscribers</p></div>
            <div className={styles.subsciptions}>Subscriptions<span style={{marginLeft:'10px'}}>{number}</span>
            <div>
                <ul>
                    {subscribes.map((group)=>(
                        <li key={group.id} className={styles.list}>
                            <Image width='24px' height='24px' src={group.icon} alt='profile_image_error' />
                            <span>{group.text}</span>
                        </li>
                    ))} 
                </ul>
                <div className={styles.allLink}> <Link href='/subscriptions'>Show all</Link></div>
               
                </div>
            </div>
        </div>
    )
}

export default ProfileSubscriptions