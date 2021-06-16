import styles from './css/styles.module.css';
import DashboardThrdComp from '../../Dashboard/DashboardThrdComp/DashboardThrdComp';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {LIVE_EVENT,
        IS_DEV, DEV_URL, PROD_URL} from '../../../Constants/Constants.js';
import socketIOClient from "socket.io-client";


export default function ProfileSecComp() {
    

    const[challengeData, setChallengeData]=useState(null)
    const[isDoneFetchning, setIsDoneFetchning]=useState(false)
  
      const URL=IS_DEV?DEV_URL:PROD_URL;
  
      const fetchChallenges=async()=>{
  
          setIsDoneFetchning(false)
          setChallengeData(null);
          const [firstResponse] = 
          await Promise.all([
              axios.post(`${URL}/getChallenges`,{eventType:LIVE_EVENT}),
            ]);
  
            setChallengeData([firstResponse.data.data.Items])
      }
  
      useEffect(()=>{
          if(challengeData!=null){
              setIsDoneFetchning(true)
          }
      },[challengeData]);
  
      useEffect(() => {
          fetchChallenges();
          const socket = socketIOClient(URL);
          socket.on("challengeAdded", () => {
              fetchChallenges();
          });
          socket.on('challengeUpdatedRefresh',()=>{
              fetchChallenges();
          })
          
          return () => socket.disconnect();
      }, []);

    return(
        <div className={styles.main}>
            <DashboardThrdComp
             isDoneFetchning={isDoneFetchning}
             challengeData={challengeData} />
        </div>
    )
}
