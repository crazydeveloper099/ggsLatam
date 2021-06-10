import styles from './css/styles.module.css';
import TodayChallenges from './TodayChallenges/TodayChallenges.js'
import Slider from "react-slick";
import axios from 'axios';
import {MINECRAFT,LIVE_EVENT,STATIC_CHALLENGE,TOURNAMENTS,
        IS_DEV, DEV_URL, PROD_URL} from '../../../Constants/Constants.js';
import socketIOClient from "socket.io-client";
import CircularProgress from '@material-ui/core/CircularProgress';
import {useState,useEffect} from 'react';


export default function MinecraftEveSecComp(){
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

const[challengeData, setChallengeData]=useState(null)
const[isDoneFetchning, setIsDoneFetchning]=useState(false)

const URL=IS_DEV?DEV_URL:PROD_URL;

    const fetchChallenges=async()=>{
        setIsDoneFetchning(false)
        setChallengeData(null);
        const [firstResponse, secondResponse, thirdResponse, fourthResponse] = await Promise.all([
            axios.post(`${URL}/getChallenges`,{eventType:LIVE_EVENT}),
            axios.post(`${URL}/getChallenges`,{eventType:STATIC_CHALLENGE}),
            axios.post(`${URL}/getChallenges`,{eventType:TOURNAMENTS}),
            axios.post(`${URL}/getChallenges`,{eventType:MINECRAFT})
          ]);

          setChallengeData([...firstResponse.data.data.Items,
                            ...secondResponse.data.data.Items, 
                            ...thirdResponse.data.data.Items,
                            ...fourthResponse.data.data.Items])
    }

    useEffect(()=>{
        if(challengeData!=null){
            setIsDoneFetchning(true)
        }
    },[challengeData]);

    useEffect(() => {
        const socket = socketIOClient(URL);
        socket.on("challengeAdded", () => {
            fetchChallenges();
        });
        socket.on('challengeUpdatedRefresh',()=>{
            fetchChallenges();
        })
        fetchChallenges();
}, []);



    return(
        <div className={styles.main}>
             <div className={styles.heading}>
             <span style={{color:'#8A2BE2'}}>Eventos</span> de hoy
            </div>
            <div className={styles.cardContainer}>
                {isDoneFetchning && challengeData!=null?
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