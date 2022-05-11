import React from 'react'
import { NextPage } from 'next'
import PostComments from '../components/CommentModule/PostComments'
import GroupPage from '../components/Groups/GroupPage'
import {comments} from './api/data.js'
import Header from '../components/Header'
import SideBarContainer from '../components/SideBarComponents/SideBarContainer'
import styles from '../styles/Home.module.scss'
import SideComments from '../components/CommentModule/SideComments'

const Group:React.FC = () => {
    return(
        <div className={styles.container}>
      <div className={styles.sticky}>
       <Header menuClick={()=>{}}/>
       <div className={styles.sidebar}>
        <SideBarContainer />
        </div> 
      </div>
      <div>
        
      </div>
      <div className={styles.groupPage}>
      <GroupPage />
      </div>
      
     
       <div className={styles.postComments}>
      <PostComments  />
      </div>
      <div className={styles.sidebarComments}>
        <SideComments />
      </div>
      
      
    </div>
    )   
}
export default Group

