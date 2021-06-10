import EventsFirstSec from '../../components/Events/EventsFirstSec/EventsFirstSec';
import EventsSecComp from '../../components/Events/EventsSecComp/EventsSecComp';
import EventsThirdSec from '../../components/Events/EventsThirdSec/EventsThirdSec.js';
import EventsFourthSec from '../../components/Events/EventsFourthSec/EventsFourthSec.js'
import Header from '../../components/Header/Header.js'
import Footer from '../../components/Footer/Footer.js'
import { useEffect, useState } from 'react';
import axios from 'axios';
import {MINECRAFT,LIVE_EVENT,STATIC_CHALLENGE,TOURNAMENTS,
        IS_DEV, DEV_URL, PROD_URL,SPECIAL_EVENT} from '../../Constants/Constants.js';
import socketIOClient from "socket.io-client";
export default function Events() {

    const[challengeData, setChallengeData]=useState(null)
    const[isDoneFetchning, setIsDoneFetchning]=useState(false)

    const URL=IS_DEV?DEV_URL:PROD_URL;

    const fetchChallenges=async()=>{

        setIsDoneFetchning(false)
        setChallengeData(null);
        const [firstResponse, secondResponse, thirdResponse, fourthResponse,fifthResponse, posterResponse] = 
        await Promise.all([
            axios.post(`${URL}/getChallenges`,{eventType:LIVE_EVENT}),
            axios.post(`${URL}/getChallenges`,{eventType:STATIC_CHALLENGE}),
            axios.post(`${URL}/getChallenges`,{eventType:TOURNAMENTS}),
            axios.post(`${URL}/getChallenges`,{eventType:MINECRAFT}),
            axios.post(`${URL}/getChallenges`,{eventType:SPECIAL_EVENT}),
            axios.get(`${URL}/getfeaturedEventsPosters`)
          ]);

          setChallengeData([firstResponse.data.data.Items,
                            secondResponse.data.data.Items, 
                            thirdResponse.data.data.Items,
                            fourthResponse.data.data.Items,
                            fifthResponse.data.data.Items,
                            posterResponse.data.data.Items])
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
            <EventsFirstSec 
                isDoneFetchning={isDoneFetchning}
                challengeData={challengeData} />
            <EventsSecComp
                isDoneFetchning={isDoneFetchning}
                challengeData={challengeData}
             />
            <EventsThirdSec
                isDoneFetchning={isDoneFetchning}
                challengeData={challengeData} />
            <EventsFourthSec
                isDoneFetchning={isDoneFetchning}
                challengeData={challengeData} />
            <Footer />
        </div>
    )
}