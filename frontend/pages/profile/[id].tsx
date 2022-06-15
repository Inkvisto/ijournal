import React from 'react'
import type { NextPage } from 'next'
import styles from '../../styles/Home.module.scss'
import Header from '../../components/Header'
import SideBarContainer from '../../components/SideBarComponents/SideBarContainer'
import SideComments from '../../components/CommentModule/SideComments'
import ProfileContainer from '../../components/ProfileComponents/ProfileContainer'
import { setUserData } from '../../redux/slices/user'
import { Api } from '../../utils/api'
import { wrapper } from '../../redux/store'
import Shell from '../../components/ShellComponent'
import { UserApi } from '../../utils/api/user/user'
import { useStore } from 'effector-react'
import { $user } from '../../effector/$user'

const ProfilePage: NextPage = () => {
  const[sideBarVisible,setSideBarVisible] = React.useState(true)
  const user = useStore($user)

  const sideBarToggle =() =>{
    if(sideBarVisible === true){
      setSideBarVisible(false)
    }else{
      setSideBarVisible(true)
    }
  }
  return (
    <div>
     <Shell />
      
      <div className={styles.profileMain}>
        <ProfileContainer user={user} />
      </div>
  
    
    </div>
  )
}

export default ProfilePage


