import {useState, useEffect} from 'react';
import EventSecPage from '../../components/EventPage/EventPageSecComp/EventPageSecComp.js';
import EventThdComp from '../../components/EventPage/EventThdComp/EventThdComp.js';
import EventFstComp from '../../components/EventPage/EventPageFstComp/EventPageFstComp.js';
import socketIOClient from "socket.io-client";
import {IS_DEV, DEV_URL, PROD_URL, MINECRAFT, STATIC_CHALLENGE} from '../../Constants/Constants.js';
import axios from 'axios';
import Header from '../../components/Header/Header.js'
import Footer from '../../components/Footer/Footer.js'
const EventPage = () => {
    
  const[challengeData, setChallengeData]=useState(null)
  const[isLoading, setIsLoading]=useState(true)
  const[isParticipated, setIsParticipated]=useState(false)
  const[removeDialog, setRemoveDialog]=useState(true)
  const[passwordPayload, setPasswordPayload]=useState(null)
  const[status, setTimerStatus]=useState(1);
  const[eventType, setEventType]=useState(null);
  const[username, setUsername]=useState('');

  const URL=IS_DEV?DEV_URL:PROD_URL;
  const checkParticipation=()=>{
    
    const query=(window.location.href.split('/').pop())
    const id=query.split('?')[1]
    const eventType1=query.split('?')[0]
    let email=localStorage.getItem('email')
      if(email){
        
        axios.post(`${URL}/checkParticipation`,
        {email,challengeID:id,eventType:eventType1})
          .then(res=>{
            console.log(challengeData);
              if(res.status==200){
                if(res.data.isParticipated){
                  setRemoveDialog(false)
                  setIsLoading(false)
                  setUsername(res.data.username)
                  setIsParticipated(true)
                }
                else{
                  setRemoveDialog(false)
                  setIsLoading(false)
                  setIsParticipated(false)
                }  
              } 
              else console.log(res.data);
        })
        .catch(err=>console.log(err))
      }
      else{
        setIsLoading(false)
        setRemoveDialog(false)
      }
  }


  const setStatusForTimer=(res)=>{
   
      if(res.isResultPublished.BOOL){
        setTimerStatus(9)
      }
      else if(res.resultTimer.S!='null'){
        setTimerStatus(6)
      }
      else if(res.isMatchEnded.S!='null'){
        setTimerStatus(5)
      }
      else if(res.passwordTimer.S!='null'){
        setTimerStatus(3)
      }
  }

  const fetchChallenges=()=>{
  const query=(window.location.href.split('/').pop())
    const id=query.split('?')[1]
    const eventType1=query.split('?')[0]
      axios.post(`${URL}/getSpecificChallenge`,{id, eventType:eventType1})
      .then(res=>{
           if(res.data.status=='success'){
            setChallengeData(res.data.data.Item);
            setStatusForTimer(res.data.data.Item);
            
           } 
           else console.log(res.data);
      })
      .catch(err=>console.log(err))
  }
  

  
    useEffect(() =>{ 
      if(challengeData!=null){
        checkParticipation();
      }      
    } , [challengeData]);  
  useEffect(() =>{ 
    const query=(window.location.href.split('/').pop())
    setEventType(query.split('?')[0])
    fetchChallenges();

      const socket = socketIOClient(URL);
      socket.on('notifyResultsPublished', () => {
          setRemoveDialog(false)
          fetchChallenges();
      }); 
      socket.on("challengeChanged", () => {
          setRemoveDialog(false)
          fetchChallenges();
      });           
      socket.on('challengeUpdatedRefresh',()=>{
          setRemoveDialog(false)
          fetchChallenges();
      })
      socket.on('passwordAnnounced',(data)=>{
          setPasswordPayload(data)
          fetchChallenges();
      })
      return () => socket.disconnect();

    }, []);  

  return (
     
               
    
   <div style={{ backgroundColor:'#1b0020'}}>
   <Header />
      {!isLoading?
        'S' in challengeData.liveStreamWidgetType?
            challengeData.liveStreamWidgetType.S=='Facebook'?
            <EventFstComp facebook={true} challengeData={challengeData}  />
            :
            <EventFstComp facebook={false} challengeData={challengeData} />
          :null
        :null  
      }

       <EventSecPage 
       isLoading={isLoading} 
       challengeData={challengeData} 
       isParticipated={isParticipated}
       removeDialog={removeDialog}
       passwordPayload={passwordPayload}
       timerStatus={status}
       eventType={eventType}
       setTimerStatus={setTimerStatus}
       username={username} />
       
       <EventThdComp 
       isLoading={isLoading} 
       challengeData={challengeData} 
       isParticipated={isParticipated}
       eventType={eventType}
       removeDialog={removeDialog} />
       <Footer />
   </div>
  );
};

export default EventPage;