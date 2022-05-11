import React from 'react'
import type { NextPage } from 'next'
import styles from '../../styles/Home.module.scss'
import Header from '../../components/Header'
import SideBarContainer from '../../components/SideBarComponents/SideBarContainer'
import { MainLayout } from '../../components/MainLayout'


const Write:NextPage = () =>{
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