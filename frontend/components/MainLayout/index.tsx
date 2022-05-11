import React from "react";
import styles from './MainLayout.module.scss'
import { WriteForm } from "../../components/WriteForm"
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/slices/user";



export const MainLayout :React.FC = () => {
    const dispatch = useDispatch()
    return(
        <div className={styles.container}>
            <div className={styles.block}>
              <WriteForm  />
            </div>
            
        </div>
    )
}

