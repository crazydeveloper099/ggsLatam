import Header from '../components/Header/Header.js'
import Footer from '../components/Footer/Footer.js'
import MinecraftEveFstComp from '../components/MinecraftEvents/MinecraftEveFstComp/MinecraftEveFstComp.js'
import EventsSecComp from '../components/Events/EventsSecComp/EventsSecComp.js';
import MinecraftEveThdComp from '../components/MinecraftEvents/MinecraftEveThdComp/MinecraftEveThdComp.js'
import MinecraftEveFrthComp from '../components/MinecraftEvents/MinecraftEveFrthComp/MinecraftEveFrthComp.js'
import { useEffect, useState } from 'react';
import axios from 'axios';
import {MINECRAFT,LIVE_EVENT,STATIC_CHALLENGE,TOURNAMENTS,
        IS_DEV, DEV_URL, PROD_URL} from '../Constants/Constants.js';
import socketIOClient from "socket.io-client";
  
export default function Events() {

    const[challengeData, setChallengeData]=useState(null)
    const[isDoneFetchning, setIsDoneFetchning]=useState(false)

    const URL=IS_DEV?DEV_URL:PROD_URL;

    const fetchChallenges=async()=>{

        setIsDoneFetchning(false)
        setChallengeData(null);
        const [firstResponse, secondResponse, thirdResponse, fourthResponse] = 
        await Promise.all([
            axios.post(`${URL}/getChallenges`,{eventType:LIVE_EVENT}),
            axios.post(`${URL}/getChallenges`,{eventType:STATIC_CHALLENGE}),
            axios.post(`${URL}/getChallenges`,{eventType:TOURNAMENTS}),
            axios.post(`${URL}/getChallenges`,{eventType:MINECRAFT}),
          ]);

          setChallengeData([firstResponse.data.data.Items,
                            secondResponse.data.data.Items, 
                            thirdResponse.data.data.Items,
                            fourthResponse.data.data.Items,
                            ])
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
        <div style={{ backgroundColor:'#1b0020'}}>
            <Header />
                <MinecraftEveFstComp />
                <EventsSecComp
                    isDoneFetchning={isDoneFetchning}
                    challengeData={challengeData}
                />
                <MinecraftEveThdComp />
                <MinecraftEveFrthComp />
            <Footer />
        </div>
    )
}