import styles from '../styles/Home.module.css'
import DashboardFirstComp from '../components/Dashboard/DashboardFirstComponent/DashboardFstComp'
import DashboardSecComp from '../components/Dashboard/DashboardSecComp/DashboardSecComp.js'
import DashboardThrdComp from '../components/Dashboard/DashboardThrdComp/DashboardThrdComp.js'
import DashboardFourthComponent from '../components/Dashboard/DashboardFourthComp/DashboardFourthComp.js'
import Footer from '../components/Footer/Footer.js'
import Header from '../components/Header/Header.js'
import { useEffect, useState } from 'react';
import axios from 'axios';
import {LIVE_EVENT,
        IS_DEV, DEV_URL, PROD_URL} from '../Constants/Constants.js';
import socketIOClient from "socket.io-client";

export default function Home() {

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


   return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <DashboardFirstComp />
        <DashboardSecComp />
        <DashboardThrdComp    
        isDoneFetchning={isDoneFetchning}
        challengeData={challengeData} />
        <DashboardFourthComponent />
        <Footer />

      </main>

    </div>
  )
}
