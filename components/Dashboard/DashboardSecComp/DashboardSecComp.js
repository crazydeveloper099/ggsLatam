import styles from './css/styles.module.css';
import Card from './CardComponent/CardComponent.js'
import CarouselComponent from './CarouselComponent/CarouselComponent.js'
import socketIOClient from "socket.io-client";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import {TOURNAMENTS,IS_DEV, DEV_URL, PROD_URL} from '../../../Constants/Constants.js'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from 'next/link';

export default function DashboardSecComp() {

    const[challengeData, setChallengeData]=useState(null)
    // const[open, setOpen]=useState(false)
    const URL=IS_DEV?DEV_URL:PROD_URL;

    const fetchChallenges=()=>{
        axios.post(`${URL}/getChallenges`,{eventType:TOURNAMENTS})
        .then(res=>{
            console.log(res);
             if(res.data.status=='success'){
                 setChallengeData(res.data.data.Items);
                 console.log(res.data.data.Items);
             }
             else{
                 console.log(res.data.status);
             }
        })
        .catch(err=>{
            console.log(err);
        })
    }

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
            <div className={styles.cardSection}>
           
            {challengeData!=null?
            <>
                <div className={styles.heading}>
                 
            <strong>Torneos </strong> destacados</div>  
            <div className={styles.cardContainer}>
            {challengeData.slice(0,4).map((item,index)=>{
                return(
                    <Card
                        key={index} 
                        challengeId={item.challengeId}            
                        title={item.challengeName} 
                        src={item.src} 
                        spots={item.spots} 
                        type={item.challengeType} 
                        remainingTime={item.challengeTime}
                        prize={item.challengePrize.join(", ")}
                        description={item.challengeDescription}
                        isTournament={true}
                        isBattlefy={true}    
                        battlefyLink={item.battlefyLink}    
                        eventType={item.eventType}  
                    />
                )
            })}
            </div>
            </>
            :
            <div className={styles.loadingContainer}>
                <CircularProgress color="inherit" />
            </div>
            }
            </div>
            <CarouselComponent />
        </div>
    )
}