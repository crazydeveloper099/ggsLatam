import styles from './css/styles.module.css';
import {useState} from 'react';
import Iframe from 'react-iframe'
import {MINECRAFT, STATIC_CHALLENGE} from '../../../../Constants/Constants.js'
import CircularProgress from '@material-ui/core/CircularProgress';

export default function EventThdComp(props) {


    return(
        <div>
            {!props.isLoading?   
                <div className={styles.main}>
                <div className={styles.heading}>
                    Premios&nbsp;<span className={styles.prizesSmallText}>(1gg coin = 1dollar)</span>
                </div>
                <div className={styles.value}>
                <div className={styles.prizeList}>
                {
                    props.challengeData.challengePrize.L.map((item,index)=>{
                        return(
                            <div className={styles.prizeContainer} key={index} >
                                <div className={styles.prizeText}>{item.S}
                                &nbsp;<span><img src="/ggsCoin.png" className={styles.coinLogo} alt="" /></span> </div>
                                <div className={styles.prizeStandingText}>{index+1}°</div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
            {
                props.challengeData.eventType.S!=STATIC_CHALLENGE
                && props.challengeData.eventType.S!=MINECRAFT?
                <>
                <div className={styles.heading}>
                Tutorial
            </div>
            <div className={styles.iframeCode}>
                <Iframe url={props.challengeData.ytLinkParticipationInfo.S}
                    className={styles.responsive}
                    id="myId"
                    display="initial"
                    position="relative"
                    frameBorder={0}
                    styles={{borderRadius: '10px'}}
                />
            </div>
            </>:
            null
            }
            
            <div className={styles.heading}>
            Descripcion
            </div>
            <div className={styles.value}
            dangerouslySetInnerHTML={{ __html: props.challengeData.challengeDescription.S }}
            />
            <div className={styles.heading}>
            Reglas
            </div>
            <div className={styles.value}
            dangerouslySetInnerHTML={{ __html: props.challengeData.challengeRules.S }}
            />
             
        </div> 
        :
        <div className={styles.loadingContainer}>
            <CircularProgress color="inherit" />
        </div>
        }
    </div>
        
    )
}