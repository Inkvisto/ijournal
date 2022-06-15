import React from 'react'
import type { NextPage } from 'next'
import styles from '../../styles/Home.module.scss'
import Header from '../../components/Header'
import SideBarContainer from '../../components/SideBarComponents/SideBarContainer'
import { MainLayout } from '../../components/MainLayout'
import { wrapper } from '../../redux/store'
import { Api } from '../../utils/api'
import { setUserData } from '../../redux/slices/user'
import { Category } from '../../utils/api/category/category.types'
import { Commentary } from '../../utils/api/comment/comment.types'
import { User } from '../../utils/api/user/user.types'
import { CategoryApi } from '../../utils/api/category/category'


interface UnionData {
  user:User,
  category:[Category],
  comments:[Commentary]
}



const Write:NextPage<UnionData> = () =>{




    return <div className={styles.writeContainer}>
    <div className={styles.sticky}>
    <Header menuClick={()=>{}}/>
   
    <div className={styles.sidebar}>
    <SideBarContainer />
    </div>
    </div>
    <div className={styles.mainLayout}>
    <MainLayout />
    </div>
  </div>
}

export default Write


