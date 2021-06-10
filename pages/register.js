import styles from '../styles/Home.module.css'
import SignupLeftImage from '../components/Signup/SignupLeftImage/SignupLeftImage.js'
import SignupRightContent from '../components/Signup/SignupRightContent/SignupRightContent.js'
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
        text={loadingText}
        > <Header isAuth={true} />
         <div>
            <div className={styles.loginAlignComponents}>
                <SignupLeftImage />
                <SignupRightContent
                setLoadingValue={v=>setLoading(v)} 
                setLoadingTextValue={v=>setLoadingText(v)}    
                 />
            </div>
        </div>
    </LoadingOverlay>   
            
    )
}