import styles from './css/styles.module.css';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useState,useEffect} from 'react';
import {MDBIcon } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

export default function EventsFourthComp(props){

const[isEmpty, setIsEmpty]=useState(false)

useEffect(()=>{
    if(props.isDoneFetchning && props.challengeData!=null){
        if((props.isAllEvents?props.challengeData[3]:props.challengeData[1]).length==0){
            setIsEmpty(true)
        }
    }
    
},[props.isDoneFetchning])


return(
    <div className={
    props.isDoneFetchning? (props.isAllEvents?props.challengeData[3]:props.challengeData[1]).length>0?styles.main:null:styles.main}>
    {props.isDoneFetchning && (props.isAllEvents?props.challengeData[3]:props.challengeData[1])!=null ?
    (props.isAllEvents?props.challengeData[3]:props.challengeData[1]).length>0?
        isEmpty==false?
        <>
            <img className={styles.img} 
            src={(props.isAllEvents?props.challengeData[3]:props.challengeData[1])[0].src}
            alt=""/>
        <div className={styles.imgOverlay} />
        <div className={styles.textLayer}>
            <div className={styles.heading}>
                <span style={{color:'#FF00FF'}}>{(props.isAllEvents?props.challengeData[3]:props.challengeData[1])[0].challengeName}</span>
                <br/>
                <span className={styles.descText}>
                <div dangerouslySetInnerHTML={{ __html: (props.isAllEvents?props.challengeData[3]:props.challengeData[1])[0].challengeDescription }}
                /></span>
                <div className={styles.PrizeContainer}>
                <MDBIcon icon="trophy" />&nbsp;&nbsp;
                {(props.isAllEvents?props.challengeData[3]:props.challengeData[1])[0].challengePrize.length>1?
                'Multiples premios':
                '$'+(props.isAllEvents?props.challengeData[3]:props.challengeData[1])[0].challengePrize[0]}
                </div>
            </div>
           
            <Link href="/minecraft">
                        <Button variant="contained" color="primary" size='large' 
                           className={styles.buttonBlue}>
                            PARTICIPA AHORA
                            </Button>
                            </Link>
        </div>
        </>
        :
        <>
        <img className={styles.img} 
        src="/minecraftImg2.png"
         alt=""/>
        <div className={styles.imgOverlay} />
        <div className={styles.textLayer}>
            <div className={styles.heading}>
                <span style={{color:'#FF00FF'}}>Minecraft</span>
                <br/>
                No Events Available This Time!
            </div>
            <Link href="/minecraft">
                        <Button variant="contained" color="primary" size='large' 
                            className={styles.buttonBlue}>
                            PARTICIPA AHORA
                            </Button>
                            </Link>
        </div>
        </>
        :null
        :
        <div className={styles.loadingContainer}>
            <CircularProgress color="inherit" />
        </div>
    }
    </div>
   )
}