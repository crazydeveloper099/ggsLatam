import styles from './css/styles.module.css';
import {useState, useEffect} from 'react';
import { Progress } from 'antd';
import React from 'react';
import DialogComp from '../../../Dialog/DialogComp.js'
import Countdown from 'react-countdown';


export default function CardComponent(props) {

    const [progress, setProgress] = useState(0);
    const [open, setOpen] = useState(false);
    const [isCompleted, setIsCompleted]=useState(false)

    const Completionist = () => <span style={{visibility:'hidden'}}>Completed!</span>;


    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            setIsCompleted(true)
          return <Completionist />;  
        }else if(hours>0){
            return <span> {hours}&nbsp;hr&nbsp;&nbsp;{minutes}&nbsp;min</span>
        }else if(minutes>0 && hours==0){
            return <span>{minutes}&nbsp;min&nbsp;&nbsp;{seconds}&nbsp;seg</span>
        } else {
          return <span> {seconds}&nbsp;seg</span>
        }
      };
    

    useEffect(() => {
        let pctg=parseInt(props.spots.split('/')[0])/parseInt(props.spots.split('/')[1])*100
        setProgress(pctg)
    }, []);

    return(
        <div>
         <DialogComp 
         setValue={setOpen} 
         open={open} 
         logo={props.src}
         title={props.title}
         type={props.type}
         spots={props.spots}
         time={props.remainingTime}
         prize={props.prize}
         description={props.description}
         isBattlefy={props.isBattlefy}
         battlefyLink={props.battlefyLink}
         challengeID={props.challengeId}
         eventType={props.eventType} 
         />
        <div className={styles.cardContainer} 
        onClick={props.isTournament?()=>setOpen(true): () => false}>
            <img className={styles.img} src={props.src} alt=""/> 
            <div className={styles.cardInnerContainer}>

                <div className={styles.logoContainer}>
                    <img src='/ggsLogoNoBg.png' 
                    alt=""
                    className={styles.logo} />
                    <div className={styles.titleTypeContainer}>
                        <div className={styles.title}>{props.title}</div>
                        <div className={styles.type}>{props.type}</div>
                    </div>
                </div>
                <div>
                <div className={styles.sameLineSpots}>
                    <div className={styles.slotText}>Cupos</div>
                    <div className={styles.slotText}>{props.spots}</div>
                </div>
                <Progress 
                percent={progress} 
                strokeColor={{
                    '0%': '#FF00FF',
                }}
                status="active" 
                strokeLinecap='round'
                size='small'
                strokeWidth='0.8vh'
                trailColor='#2f4f4f'
                showInfo={false} />
                
                <div className={styles.sameLineDate}>
                    <div className={styles.slotText}>Fecha</div>
                    <div className={styles.slotText} 
                    style={{color:'#3a7bd5',fontFamily:'avenir'}}>
                    {props.remainingTime.split(' ')[0]}
                    </div>
                </div>

                <div className={styles.sameLineDate} >
                {!isCompleted?<div  className={styles.slotText}>Comienza en</div>:null}
                    <div className={styles.slotText} style={{color:'orange',fontFamily:'avenir-light'}}>
                     <Countdown
                            date={new Date(props.remainingTime).getTime()}
                            renderer={renderer}
                        />
                    </div>
                </div>
                
                </div>
            </div>   
        </div>
        </div>
    )
}