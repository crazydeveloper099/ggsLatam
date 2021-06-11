import styles from '../css/styles.module.css'
import Card from '../../../Dashboard/DashboardSecComp/CardComponent/CardComponent.js'
import {useState} from 'react';
import Button from '@material-ui/core/Button';

import {TOURNAMENTS} from '../../../../Constants/Constants.js'
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from 'next/link'
import Router from 'next/router';

export default function CardSection(props){
    const[cardCount, setCardCount]=useState(1);

   

const getElements=()=>{
    let elements = [];
    for( let i=0;i<props.challengeData.length;i++){
        let item=props.challengeData[i];
        elements.push(
            {...props.eventType!=TOURNAMENTS?
            <Link key={i}  href={'/events/'+props.eventType+'?'+item.challengeId}>
                <a>
                <Card            
                title={item.challengeName} 
                src={item.src} 
                spots={item.spots} 
                type={item.challengeType} 
                remainingTime={item.challengeTime}
                prize={item.challengePrize.join(", ")}
                description={item.challengeDescription}
                battlefyLink={null}
                isBattlefy={false}
                isTournament={false}      
                eventType={item.eventType}  
                challengeId={item.challengeId}  
                removeDialog={props.removeDialog}              
                />
                </a>
            </Link>:  
            <Card
                challengeId={item.challengeId}            
                title={item.challengeName} 
                src={item.src} 
                spots={item.spots} 
                key={i}
                type={item.challengeType} 
                remainingTime={item.challengeTime}
                prize={item.challengePrize.join(", ")}
                description={item.challengeDescription}
                isTournament={true}
                isBattlefy={true}    
                battlefyLink={item.battlefyLink}    
                eventType={item.eventType}  
                removeDialog={props.removeDialog}                      
            />
            }
        )
    }
    return elements;
}

const separateElement =()=> { 
 var separateElements = [];
 var multiElements = getElements();

for(var i = 0; i < multiElements.length; i+=4) {
     var oneRow = [];
     oneRow.push(multiElements.slice(i, i+4).map((item,index) => {
   return <div  key={index}>{item}</div>
}))
separateElements.push(oneRow.map((itm,index) => {return <div key={index} className={styles.cardContainer}>{itm}</div>}))
}
return separateElements;
}

    return(
        <div className={styles.cardSection}>
             
             <div className={styles.heading}>
             <span style={{color:'#8A2BE2'}}>{props.heading}</span> disponibles
            </div>
            {
                props.challengeData!=null && props.isDoneFetchning?
                <>  
                {separateElement().splice(0,cardCount)
                    .map((itemArr,index)=>{return(<div key={index}>{itemArr}</div>)})
                }
            
            {props.challengeData.length>4 || props.isDashboard?
            <div className={styles.heading}>

                <Button variant="contained" color="primary" size='large' 
                onClick={props.isDashboard?
                ()=>Router.push('/events')
                :()=>setCardCount(cardCount+1)}
                classname={styles.buttonBlue}>
                {props.isDashboard?'Eventos':'Mostrar más'}
                </Button>
            </div>
            :null
            }
            </>:
                <div className={styles.loadingContainer}>
                    <CircularProgress color="inherit" />
                </div>
            }
            </div>
    )
}