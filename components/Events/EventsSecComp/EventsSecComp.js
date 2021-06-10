import styles from './css/styles.module.css';
import TodayChallenges from './TodayChallenges/TodayChallenges.js'
import Slider from "react-slick";

import CircularProgress from '@material-ui/core/CircularProgress';
import {useState,useEffect} from 'react';


export default function EventsSecComp(props){
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "-10px",
        slidesToShow: 3,
        speed: 1000,
        arrows:false,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,
    };

    const[challengeData, setChallengeData]=useState(null);
    
    console.log(challengeData);
    useEffect(()=>{
        if(props.isDoneFetchning && props.challengeData!=null){
            setChallengeData([...props.challengeData[0],
                                ...props.challengeData[1],
                                ...props.challengeData[3],
                            ])
        }
    },[props.isDoneFetchning])

    return(
        <div className={styles.main}>
             <div className={styles.heading}>
             <span style={{color:'#8A2BE2'}}>Retos</span> disponibles
            </div>
            <div className={styles.cardContainer}>
                {challengeData!=null?
                <div className={styles.container}>
                    <Slider {...settings}>
                    {challengeData.map((item,index)=>{
                return(
                    <TodayChallenges 
                    key={index}
                    img={item.src} 
                    title={item.challengeName} 
                    type={item.challengeType}
                    eventType={item.eventType}
                    challengeId={item.challengeId}
                    reward={item.challengePrize.join(", ")}  
                    />
                        )})}
                    </Slider>
                </div>
                :
                 <div className={styles.loadingContainer}>
                    <CircularProgress color="inherit" />
                </div>
         }   
            </div>
        </div>
    )
}