import styles from './css/styles.module.css';
import CardSection from './CardSection/CardSection.js'
import {LIVE_EVENT,MINECRAFT,SPECIAL_EVENT,STATIC_CHALLENGE,TOURNAMENTS} from 
                '../../../Constants/Constants.js'

export default function EventsThirdComp(props){  
    
    
    
    return(
        <div className={styles.main}>
        {props.isDoneFetchning?
            <>
            {props.challengeData[0].length>0?
            <CardSection 
            eventType={LIVE_EVENT} 
            isDashboard={false}  
            isDoneFetchning={props.isDoneFetchning}
            challengeData={props.challengeData[0]} 
            heading='Salas En Vivo' />
            :null}
            {props.challengeData[1].length>0?
            <CardSection 
            eventType={STATIC_CHALLENGE} 
            heading='Retos' 
            isDoneFetchning={props.isDoneFetchning}
            challengeData={props.challengeData[1]} 
            isDashboard={false}/>
            :null
            }
            {props.challengeData[2].length>0?
            <CardSection 
            eventType={TOURNAMENTS} 
            heading='Torneos' 
            isDoneFetchning={props.isDoneFetchning}
            challengeData={props.challengeData[2]} 
            isDashboard={false}/>
            :null}
            {props.challengeData[4].length>0?
            <CardSection 
            eventType={SPECIAL_EVENT} 
            heading='Eventos especiales' 
            isDoneFetchning={props.isDoneFetchning}
            challengeData={props.challengeData[4]} 
            isDashboard={false}/>
            :null}
            </>
            :
            null}
        </div>
    )
}