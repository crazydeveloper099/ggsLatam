import styles from './css/styles.module.css';
import Card from './Card/Card.js'
import axios from 'axios';
import {MINECRAFT,LIVE_EVENT,STATIC_CHALLENGE,TOURNAMENTS,
        IS_DEV, DEV_URL, PROD_URL} from '../../../Constants/Constants.js';
import socketIOClient from "socket.io-client";
import CircularProgress from '@material-ui/core/CircularProgress';
import {useState,useEffect} from 'react';

export default function MinecraftEveThdComp() {


const[challengeData, setChallengeData]=useState(null)
const[isDoneFetchning, setIsDoneFetchning]=useState(false)

const URL=IS_DEV?DEV_URL:PROD_URL;

    const fetchChallenges=async()=>{
        setIsDoneFetchning(false)
        setChallengeData(null);
        const [firstResponse] = await Promise.all([
            axios.post(`${URL}/getChallenges`,{eventType:MINECRAFT})
          ]);

          setChallengeData([...firstResponse.data.data.Items])
    }

    useEffect(()=>{
        if(challengeData!=null){
            console.log(challengeData);
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

  return (
      <div className={styles.main}>
        {isDoneFetchning && challengeData!=null?
            challengeData.map((item,index)=>{
                return(
                    <Card
                    key={index}
                    img={item.src}
                    eventName={item.challengeName}
                    title={item.challengeType}
                    description={item.challengeDescription}
                    link={'/events/'+MINECRAFT+'?'+item.challengeId}
                    />
                )
            })
            :
            <div className={styles.loadingContainer}>
                <CircularProgress color="inherit" />
            </div>
        }
      </div>
  )
}