import styles from './css/styles.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from 'next/link';
import DialogComp from '../../Dialog/DialogComp.js';
import PasswordDialog from '../../Dialog/PasswordDialog/PasswordDialog.js'
import {useState, useEffect} from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {  MDBIcon } from "mdbreact";
import Router from 'next/router';
import moment from 'moment-timezone';
import { STATIC_CHALLENGE,MINECRAFT, LIVE_EVENT, SPECIAL_EVENT, TOURNAMENTS } from '../../../Constants/Constants';
import { Typography } from '@material-ui/core';
moment().format();

export default function EventPageSecComp(props){

   
    const leaderBoardRedirect=()=>{
        Router.push('/leaderboard#'+props.eventType+'#'+props.challengeData.challengeId.S)
    }

    const calculateTimeLeft = (future) => {
        if(future!=null){
            future=new Date(future).getTime()
            let utcNow=new Date(moment.tz(new Date(), "GMT")
                            .utcOffset(-300)
                            .format("MM/DD/YYYY hh:mm:ss a"))
                            .getTime()
            let difference = future - utcNow;
            let timeLeft = {};
            let days=Math.floor(difference / (1000 * 60 * 60 * 24));
            let hours=Math.floor((difference / (1000 * 60 * 60)) % 24);
            let mins=Math.floor((difference / 1000 / 60) % 60);
            let sec=Math.floor((difference / 1000) % 60)
            if (difference > 0) {
                if(days>0){
                    timeLeft = {
                        'DÍA(S)': days,
                    };
                }
                else if(days==0 && hours>0){
                    timeLeft = {
                        h: hours,
                        m: mins,
                        s: sec
                    };
                }
                else if(days==0 && hours==0 && mins>0){
                    timeLeft = {
                        min: mins,
                        'SEG': sec
                    };
                }
                else{
                    timeLeft = {
                        'SEG': sec
                    };
                }
          }
          else{

              if(!props.isLoading){
                  if(props.eventType==STATIC_CHALLENGE || 
                    props.eventType==MINECRAFT
                    || props.eventType==SPECIAL_EVENT || 
                    props.eventType==TOURNAMENTS){
                        if(props.timerStatus==1){
                            props.setTimerStatus(4);
                        }
                        props.timerStatus==4?props.setTimerStatus(5):null;
                        props.timerStatus==6?props.setTimerStatus(7):null;
                  }
                  else{
                    props.timerStatus==1?props.setTimerStatus(2):null;
                    props.timerStatus==3?props.setTimerStatus(4):null;
                    props.timerStatus==6?props.setTimerStatus(7):null;
                  }
              }
          }
          return timeLeft;
        }
    else return {d: '',h: '',m: '',s: ''};
}
/***
 * 1- Event Timer
 * 2- Delay in password Announcement
 * 3- Password Timer
 * 4- Event Started
 * 5- Event Ended
 * 6- Results Timer
 * 7- Results Delayed
 * 8- Results Announced
 * 9- Expired
 *  */    



let future=!props.isLoading? 
props.eventType==STATIC_CHALLENGE || 
props.eventType==MINECRAFT?
props.challengeData.resultTimer.S!='null'? 
props.challengeData.resultTimer.S:
props.timerStatus==4?
props.challengeData.endTimeStaticEvt.S:
props.challengeData.end_time.S
:  
props.challengeData.resultTimer.S!='null'? 
props.challengeData.resultTimer.S:
props.challengeData.passwordTimer.S!='null'?
props.challengeData.passwordTimer.S:
props.challengeData.end_time.S
:null;


    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(null));
    useEffect(() => {
      setTimeout(() => setTimeLeft(calculateTimeLeft(future)), 1000);
    });
    const timerComponents = [];
    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return;
        }
        timerComponents.push(
            <span>
            {timeLeft[interval]} {interval}{" "}
        </span>
        );
    });  
    const [open, setOpen] = useState(false);
    const [openPasswordDialog, setOpenPasswordDialog] = useState(false);


    const loginRedirect=()=>{
        localStorage.setItem('redirectPage','/events/'+props.eventType+'/'+props.challengeData.challengeId.S);
        Router.push('/login')
    }
console.log(props.eventType);

    return(
        <div>
        {!props.removeDialog?
            props.challengeData!=null?
            <DialogComp
            setValue={setOpen} 
            open={open} 
            logo={props.challengeData.src.S}
            title={props.challengeData.challengeName.S}
            type={props.challengeData.challengeType.S}
            spots={props.challengeData.spots.S}
            time={props.challengeData.end_time.S}
            battlefyLink={null}
            prize={props.challengeData.challengePrize.L.map(item=>item.S).join(", ")}
            description={props.challengeData.challengeDescription.S}
            isBattlefy={false}
            eventType={props.eventType}
            loading={false}
            challengeID={props.challengeData.challengeId.S}
            username={props.username}
        />:
        <DialogComp setValue={setOpen} 
            open={open}  loading={true} />:
        null }

       {!props.removeDialog ? 
        props.challengeData!=null?
        props.challengeData.password.S=='null' || !props.isParticipated?
        null:
        
            <PasswordDialog
                setValue={setOpenPasswordDialog}
                open={openPasswordDialog} 
                ytLinkTutorial={props.challengeData.ytLinkLobbyTutorial.S}
                password={props.challengeData.password.S}  
                eventType={props.eventType}
                loading={false}
                passwordTimer={props.challengeData.passwordTimer.S}  
            />
        :
        <PasswordDialog setValue={setOpenPasswordDialog}
                open={openPasswordDialog}  loading={true} />:
        null    
        } 
       
        <div className={styles.container}>

                
            {props.isLoading==false?
                <>
                
                <div className={styles.fstComp}>
                <img className={styles.img} 
                src={props.challengeData.src.S}
                alt=""/>
                <div className={styles.gameContainer}>
                    <div className={styles.gameName}>
                        <div className={styles.heading}>
                        {props.challengeData.challengeName.S}
                        </div>
                    </div>
                    <div className={styles.prizeText}>
                    <i className="fas fa-trophy"></i> 
                    
                    Múltiples Premios
                    </div>
                    <div className={styles.buttonList}>
                       
                       <div>
                       <Button 
                            style={{marginTop:'1vh',outline:'none'}}
                            variant="contained" 
                            size='large' 
                            onClick={props.timerStatus<8?
                            null:
                            leaderBoardRedirect}
                            className='buttonStyleSuccess'
                            >
                            {
                                props.timerStatus<8?
                                <span><i className="fas fa-lock" 
                            style={{marginRight:'1vw'}}></i> Resultados</span>
                            :
                            <span> Resultados anunciados</span>
                            }
                            
                        </Button>
                       </div>
                       {props.eventType==LIVE_EVENT ?
                        <div className={styles.buttonContainer}>
                            
                            <Button
                            style={{marginTop:'1vh',outline:'none'}}
                            variant="contained" 
                            size='large'
                          
                            onClick={
                                props.timerStatus<3 || !props.isParticipated?
                                null:()=>{setOpenPasswordDialog(true)}}
                                className='buttonStyleSuccess'
                            
                            >
                            {props.passwordPayload==null 
                            && 
                            props.challengeData.password.S=='null'?
                            <span>
                            <i className="fas fa-lock" 
                            style={{marginRight:'1vw'}}></i> 
                            CONTRASEÑA DE SALA
                            </span>
                            :
                            <span>
                            ACCESO ANUNCIADO (CLICK PARA VER)
                            </span>
                            
                            }
                            </Button>
                        </div>:null}
                        <div>
                            {/* <Button 
                                variant="contained" 
                                color="primary" 
                                size='large' 
                                className='buttonStyleSuccess'
                                >
                                <i className="fas fa-share-alt" 
                                style={{marginRight:'1vw'}}></i> COMPARTE
                        </Button> */}
                        </div>
                    </div>
                </div>
                </div>
            <div>
            {props.eventType!=SPECIAL_EVENT?
                <div className={styles.spots}>
                    <i className="fas fa-users" style={{marginRight:'1vw'}}></i>
                    {props.challengeData.spots.S}
                </div>
            :null}
                <div className={styles.secCompButtonList}>
                <div>
                {props.eventType!=SPECIAL_EVENT?
                    props.isParticipated?
                    props.eventType==STATIC_CHALLENGE||
                    props.eventType==MINECRAFT?
                    <Button 
                        style={{marginTop:'1vh',outline:'none'}}
                        variant="contained" 
                        size='large'
                        disabled={
                            props.eventType==MINECRAFT||
                            props.eventType==STATIC_CHALLENGE?
                            props.timerStatus>1 && props.timerStatus<5?
                            false:true
                            :
                            props.timerStatus>=4
                        } 
                        onClick={()=>{setOpen(true)}}
                        className="buttonStyleSuccess"
                        >
                         ÚNETE AL EVENTO
                    </Button>:
                    <Button
                        style={{marginTop:'1vh',outline:'none'}} 
                        variant="contained" 
                        size='large'
                         
                        className='buttonStyleSuccess'
                        >
                         <MDBIcon icon="check" />&nbsp;&nbsp;ESTÁS PARTICIPANDO! 
                    </Button>:
                localStorage.getItem('authType')
                &&localStorage.getItem('email')?
                props.challengeData.spots.S.split('/')[0]===
                props.challengeData.spots.S.split('/')[1]?
                    <Button 
                        style={{marginTop:'1vh',outline:'none'}}
                        variant="contained" 
                        color="primary" 
                        size='large'
                        disabled 
                        className='buttonStyleDark'
                        >
                         Spots Full 
                    </Button>
                    :
                    <Button 
                        style={{marginTop:'1vh',outline:'none'}}
                        variant="contained" 
                        color="primary" 
                        size='large'
                        disabled={
                            props.eventType==MINECRAFT||
                            props.eventType==STATIC_CHALLENGE 
                            || props.eventType==TOURNAMENTS ?
                            props.timerStatus<5?
                            false:true
                            :
                            props.timerStatus>=4
                        } 
                        onClick={()=>{setOpen(true)}}
                        className='buttonStyleSuccess'
                        >
                 {props.timerStatus<2?"Pre-participa":"ÚNETE AL EVENTO"}                    
                 </Button>:
                   
                    <Button 
                        style={{marginTop:'1vh',outline:'none'}}
                        variant="contained" 
                        color="primary" 
                        size='large' 
                        onClick={loginRedirect}
                        className='buttonStyleDark'
                        >
                         Iniciar sesion 
                    </Button>
                    :
                    null
                }
                </div>
                    
                    <div>
                    <Button 
                        style={{marginTop:'1vh',outline:'none'}}
                        variant="contained" 
                        color="primary" 
                        size='large'
                        className='buttonStyleDark'
                        >
                        <div>
                            <Typography>
                            {props.eventType==LIVE_EVENT?
                                props.timerStatus==1 || props.timerStatus==3?'La sala comenzará en:':
                                props.timerStatus==2?'Acceso por anunciarse':
                                props.timerStatus==4?'LA SALA HA COMENZADO':
                                props.timerStatus==5?'Resultados en:':
                                props.timerStatus==6?'Resultados por anunciarse':
                                props.timerStatus==7?'Resultados por anunciarse':
                                props.timerStatus==8?'Resultados anunciados' : 'Evento finalizado'
                                :
                                props.timerStatus==1 || props.timerStatus==3?'Puedes participar en:':
                                props.timerStatus==2?'Puedes participar en:':
                                props.timerStatus==4?'El reto finaliza en:':
                                props.timerStatus==5?'Resultados por anunciarse':
                                props.timerStatus==6?'Resultados por anunciarse':
                                props.timerStatus==7?'Resultados anunciados':
                                props.timerStatus==8?'Resultados anunciados':'Evento finalizado'
                            }
                            </Typography>
                            <Typography>
                          {props.timerStatus<8?timerComponents:null} </Typography>
                          </div>
                    </Button>
                    </div>
                </div>    
                </div>
                </>
            :
            <div className={styles.loadingContainer}>
                <CircularProgress color="inherit" />
            </div>
            }
        </div>
        </div>
    )
}