import styles from './css/styles.module.css';
import CardSection from '../../Events/EventsThirdSec/CardSection/CardSection.js';
import {LIVE_EVENT} from 
                '../../../Constants/Constants.js'
export default function DashboardThrdComp(props) {
    return(
        <>
        {props.isDoneFetchning?
            props.challengeData[0].length>0?
        <div className={styles.main}>
            <CardSection 
            eventType={LIVE_EVENT} 
            heading='Salas en vivo' 
            isDashboard={true}
            isDoneFetchning={props.isDoneFetchning}
            challengeData={props.challengeData[0]} 
             />
        </div>
        :null
        :null
        }
        </>
    )
}