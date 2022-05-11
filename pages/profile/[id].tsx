import React from 'react'
import type { NextPage } from 'next'
import styles from '../../styles/Home.module.scss'
import Header from '../../components/Header'
import SideBarContainer from '../../components/SideBarComponents/SideBarContainer'
import SideComments from '../../components/CommentModule/SideComments'
import ProfileContainer from '../../components/ProfileComponents/ProfileContainer'

const ProfilePage: NextPage = () => {
  const[sideBarVisible,setSideBarVisible] =React.useState(true)

  const sideBarToggle =() =>{
    if(sideBarVisible === true){
      setSideBarVisible(false)
    }else{
      setSideBarVisible(true)
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.sticky}>
       <Header menuClick={sideBarToggle} />
       {sideBarVisible ? <div className={styles.sidebar}>
        <SideBarContainer />
        </div>: null}
      </div>
      
      <div className={styles.main}>
        <ProfileContainer />
      </div>
  
    
    </div>
  )
}

export default ProfilePage
