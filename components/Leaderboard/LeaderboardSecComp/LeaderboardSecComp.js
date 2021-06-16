import styles from './css/styles.module.css'
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../../EventPage/EventThdComp/TabPanel/TabPanel.js'
import LiveEvents from './LiveEvents/LiveEvents.js'
import StaticChallenges from './StaticChallenges/StaticChallenges.js'
import Tournaments from './Tournaments/Tournaments.js'
import Minecraft from './Minecraft/Minecraft.js'
import {useState, useEffect} from 'react';
import {IS_DEV, DEV_URL, PROD_URL,
        LIVE_EVENT,MINECRAFT, STATIC_CHALLENGE, TOURNAMENTS, SPECIAL_EVENT} 
        from '../../../Constants/Constants.js';
import axios from 'axios';
import SpecialEvents from './SpecialEvents/SpecialEvents';
import { withRouter, useRouter } from 'next/router'

export default function LeaderboardSecComp(props) {
    const { asPath } = useRouter()    

    const[eventType, setEventType]=useState(
        asPath.split('#').length>1?
    asPath.split('#')[1]
    :'LiveEvent'
    )
    const[challengeData, setChallengeData]=useState(null)
    const[clickedChgId, setClickedChgId]=useState(null)
    const[resultLen, setResultLen]=useState(null)

    const[individualResult, setIndividualResult]=useState(null)
    const[individualChg, setIndividualChg]=useState(null)
    const[individualResultReverse, setIndividualResultReverse]=useState(null)
    const[isResultEmpty, setIsResultEmpty]=useState(false)
    const[ResultSc, setResultSc]=useState(null);

    const fetchChallenges=()=>{  
        setChallengeData(null)
        setIndividualResult(null)
        setIndividualResultReverse(null)
        setIndividualChg(null)
        setIsResultEmpty(false) 
        setResultSc(null)    
        const URL=IS_DEV?DEV_URL:PROD_URL;
        axios.post(`${URL}/getLeaderBoardEvents`,{eventType})
        .then(res=>{
            if(res.status==200){
                if(res.data.data.Items && res.data.data.Items.length>0){
                    
                    setChallengeData(res.data.data.Items)
                    setClickedChgId(res.data.data.Items[0].challengeId);
                    setResultLen(JSON.parse(res.data.data.Items[0].resultData).length)
                    
                    searchResult(asPath.split('#').length>2?
                    asPath.split('#')[2]:res.data.data.Items[0].challengeId)
                }
                else{
                    setChallengeData(res.data.data.Items)
                    setIsResultEmpty(true)
                }
              } 
              else console.log(res.data,'djdjd');
        })
        .catch(err=>console.log(err,'djdjd'))
    }

    const searchResult=(challengeID)=>{
        setIndividualResult(null)
        setIndividualResultReverse(null)
        setIndividualChg(null)
        setResultSc(null)
        const URL=IS_DEV?DEV_URL:PROD_URL;
        axios.post(`${URL}/getIndividualresult`,{eventType, challengeID})
        .then(res=>{
            if(res.status==200){
                if(res.data.data.Item){
                    setIndividualChg(JSON.parse(res.data.data.Item.unitChallenge.S).Item)
                    setIndividualResult(JSON.parse(res.data.data.Item.resultData.S))
                    setIndividualResultReverse(JSON.parse(res.data.data.Item.resultData.S).reverse())
                    setResultSc(res.data.data.Item.url.S);
                }
              } 
              else console.log(res.data,'djdjd');
        })
        .catch(err=>console.log(err,'djdjd'))
    }

    const resetEvent=(id)=>{
        const Event=id==0?LIVE_EVENT:
                    id==1?STATIC_CHALLENGE:
                    id==2?TOURNAMENTS:
                    id==3?MINECRAFT:
                    SPECIAL_EVENT
        setEventType(Event) 
    }

    useEffect(() =>{
        fetchChallenges();
    },[]);
    useEffect(() => {              
        fetchChallenges()
    }, [eventType]);

const [value1, setValue] = useState(
    asPath.split('#').length>1?
    asPath.split('#')[1]==LIVE_EVENT?0:
    asPath.split('#')[1]==STATIC_CHALLENGE?1:
    asPath.split('#')[1]==TOURNAMENTS?2:
    asPath.split('#')[1]==MINECRAFT?3:
    asPath.split('#')[1]==SPECIAL_EVENT?4:0
    :0
);

const handleChange = (event, newValue) => {
  setValue(newValue);
};
const handleChangeIndex = (index) => {
  setValue(index);
};

   

return(
    <div style={{margin:"2vw 0", padding:'2vw 0',zIndex:'10'}}>
<AppBar 
      position="static" 
      color="default"
      style={{background:'transparent',boxShadow: 'none',zIndex:'10'}}
      className={styles.appBar}>
        <Tabs
        
          value={value1}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant='fullWidth'
          className={styles.tabsContainer}>
          <Tab className={styles.tabText} style={{outline:'none',color:'#ffffff', fontFamily:'avenir',zIndex:'10'}} 
          label="Salas En Vivo" 
          id='full-width-tab-0'
          onClick={()=>{
              resetEvent(0)
          }} />
           <Tab  className={styles.tabText} style={{outline:'none',color:'#ffffff', fontFamily:'avenir',zIndex:'10'}} 
          label="Retos" 
          id='full-width-tab-1' 
          onClick={()=>{
              resetEvent(1)
          }} />
           <Tab className={styles.tabText} style={{outline:'none',color:'#ffffff', fontFamily:'avenir',zIndex:'10'}} 
          label="Torneos" 
          id='full-width-tab-2'
          onClick={()=>{
              resetEvent(2)
          }} />
          <Tab className={styles.tabText} style={{outline:'none',color:'#ffffff', fontFamily:'avenir',zIndex:'10'}} 
          label="Minecraft" 
          id='full-width-tab-3'
          onClick={()=>{
              resetEvent(3)
          }} />
            <Tab className={styles.tabText} style={{outline:'none',color:'#ffffff', fontFamily:'avenir',zIndex:'10'}} 
          label="Eventos Especiales" 
          id='full-width-tab-3'
          onClick={()=>{
              resetEvent(4)
          }} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis='x-reverse'
        index={value1}
        onChangeIndex={handleChangeIndex}>

        <TabPanel  
        value1={value1} 
        index={0} 
        children={<LiveEvents
            challengeData={challengeData}
            setClickedChgId={setClickedChgId}
            setResultLen={setResultLen}
            searchResult={searchResult}
            individualChg={individualChg}
            individualResult={individualResult}
            ResultSc={ResultSc}
            individualResultReverse={individualResultReverse}
            isResultEmpty={isResultEmpty}
            setIsResultEmpty={setIsResultEmpty}
            />}
        />

        <TabPanel 
        value1={value1} 
        index={1} 
        children={<StaticChallenges
            challengeData={challengeData}
            setClickedChgId={setClickedChgId}
            setResultLen={setResultLen}
            searchResult={searchResult}
            individualChg={individualChg}
            individualResult={individualResult}
            ResultSc={ResultSc}
            individualResultReverse={individualResultReverse}
            isResultEmpty={isResultEmpty}
            setIsResultEmpty={setIsResultEmpty}
             />}
        />    
        <TabPanel 
        value1={value1} 
        index={2} 
        children={<Tournaments
             challengeData={challengeData}
            setClickedChgId={setClickedChgId}
            setResultLen={setResultLen}
            searchResult={searchResult}
            individualChg={individualChg}
            individualResult={individualResult}
            ResultSc={ResultSc}
            individualResultReverse={individualResultReverse}
            isResultEmpty={isResultEmpty}
            setIsResultEmpty={setIsResultEmpty} />}
        />    
        <TabPanel 
        value1={value1} 
        index={3} 
        children={<Minecraft
             challengeData={challengeData}
            setClickedChgId={setClickedChgId}
            setResultLen={setResultLen}
            searchResult={searchResult}
            individualChg={individualChg}
            individualResult={individualResult}
            ResultSc={ResultSc}
            individualResultReverse={individualResultReverse}
            isResultEmpty={isResultEmpty}
            setIsResultEmpty={setIsResultEmpty}  />}
        />
         <TabPanel 
        value1={value1} 
        index={4} 
        children={<SpecialEvents
             challengeData={challengeData}
            setClickedChgId={setClickedChgId}
            setResultLen={setResultLen}
            searchResult={searchResult}
            individualChg={individualChg}
            individualResult={individualResult}
            ResultSc={ResultSc}
            individualResultReverse={individualResultReverse}
            isResultEmpty={isResultEmpty}
            setIsResultEmpty={setIsResultEmpty}  />}
        />
      </SwipeableViews>
    </div>
    )
}