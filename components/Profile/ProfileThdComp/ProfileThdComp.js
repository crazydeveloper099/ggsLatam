import styles from './css/styles.module.css';
import CardSection from '../../Events/EventsThirdSec/CardSection/CardSection.js'
import {LIVE_EVENT,MINECRAFT,STATIC_CHALLENGE,TOURNAMENTS} from 
                '../../../Constants/Constants.js';

export default function ProfileSecComp() {

    return(
        <div className={styles.main}>

            <CardSection eventType={LIVE_EVENT} isDashboard={true} />

        </div>
    )
}
