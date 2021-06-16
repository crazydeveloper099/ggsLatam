
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {MINECRAFT,LIVE_EVENT,STATIC_CHALLENGE,TOURNAMENTS,
        IS_DEV, DEV_URL, PROD_URL,SPECIAL_EVENT} from '../../Constants/Constants.js';
import CardSection from '../Events/EventsThirdSec/CardSection/CardSection.js';        
import socketIOClient from "socket.io-client";
import CircularProgress from '@material-ui/core/CircularProgress';
import EventsFirstSec from '../Events/EventsFirstSec/EventsFirstSec.js';
import EventsFourthSec from '../Events/EventsFourthSec/EventsFourthSec.js';

export default function EventSection(props) {

    const[challengeData, setChallengeData]=useState(null)
    const[isDoneFetchning, setIsDoneFetchning]=useState(false)

    const URL=IS_DEV?DEV_URL:PROD_URL;

    const fetchChallenges=async()=>{

        setIsDoneFetchning(false)

        const eventDataFetchList=[
            props.index==0?axios.post(`${URL}/getChallenges`,{eventType:LIVE_EVENT}):
            props.index==1?axios.post(`${URL}/getChallenges`,{eventType:STATIC_CHALLENGE}):
            props.index==2?axios.post(`${URL}/getChallenges`,{eventType:TOURNAMENTS}):
            props.index==4?axios.post(`${URL}/getChallenges`,{eventType:SPECIAL_EVENT}):null,
            axios.post(`${URL}/getChallenges`,{eventType:MINECRAFT}),
            axios.get(`${URL}/getfeaturedEventsPosters`)
        ]

        setChallengeData(null);
        const [firstResponse, secondResponse, posterResponse] = 
        await Promise.all([
            ...eventDataFetchList
          ]);
          setChallengeData([firstResponse.data.data.Items,             
                            secondResponse.data.data.Items,
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
            <div className="liveevent">
                {isDoneFetchning?
                <>
                    <EventsFirstSec 
                    isAllEvents={false}
                    isDoneFetchning={isDoneFetchning}
                    challengeData={challengeData} />
                    {challengeData[0].length>0?
                        <CardSection 
                        eventType={props.eventType} 
                        isDashboard={false}  
                        isDoneFetchning={isDoneFetchning}
                        challengeData={challengeData[0]} 
                        heading=
                        {props.eventType==LIVE_EVENT?'Salas En Vivo':
                        props.eventType==STATIC_CHALLENGE?'Retos':
                        props.eventType==TOURNAMENTS?'Torneos':
                        props.eventType==SPECIAL_EVENT?'Eventos especiales':null}/>
                        :
                        <div className="noResults">
                        <img className="logo" src="/logo.png" alt="" />
                        <div className="heading">
                                No Events Available Currently!
                            </div>
                        </div>
                    }
                </>
                :
                <div className="loadingContainer">
                    <CircularProgress color="inherit" />
                </div>
                }
            </div>
            <EventsFourthSec
                isDoneFetchning={isDoneFetchning}
                challengeData={challengeData} />
            <Footer />
        </div>
    )
}