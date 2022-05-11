import React from 'react'
import styles from '../styles/Home.module.scss'
import Header from '../components/Header'
import SideBarContainer from '../components/SideBarComponents/SideBarContainer'
import NewestMain from '../components/MainComponents/NewestMain'
import Main from '../components/MainComponents/Main'

const NewestPage = ()=> {
  const[sideBarVisible,setSideBarVisible] =React.useState(true)

  const sideBarToggle =() =>{
    if(sideBarVisible === true){
      setSideBarVisible(false)
    }else{
      setSideBarVisible(true)
    }
  }
    return(
        <div className={styles.container}>
        <div className={styles.sticky}>
         <Header menuClick={sideBarToggle}/>
         {sideBarVisible ?<div className={styles.sidebar}>
          <SideBarContainer />
          </div> : null }
        </div>
        
        <div className={styles.main}>
          
          <NewestMain />
         
          
        </div>
     
        
        
      </div>
    )
}

export default NewestPage