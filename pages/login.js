import styles from '../styles/Home.module.css'
import LoginLeftImage from '../components/Login/LoginLeftImage/LoginLeftImage.js'
import LoginRightContent from '../components/Login/LoginRightContent/LoginRightContent.js'
import LoadingOverlay from 'react-loading-overlay';
import {useState, useEffect} from 'react';
import Header from '../components/Header/Header.js'
export default function Login() {

    const [isLoading, setLoading]=useState(false)
    const [loadingText, setLoadingText]=useState(null)

    return(
       
        
                
        <LoadingOverlay
        active={isLoading}
        spinner
        text={loadingText}>
        <Header isAuth={true} />
            <div className={styles.loginAlignComponents}>
            <LoginLeftImage />
            <LoginRightContent 
            setLoadingValue={v=>setLoading(v)} 
            setLoadingTextValue={v=>setLoadingText(v)}    
            />
            </div>

        </LoadingOverlay>
        
    )
}