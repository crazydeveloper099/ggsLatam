import Iframe from 'react-iframe'
import styles from './css/styles.module.css';
export default function EventPageFstComp(props) {

  return (
      <div className={styles.container}>   
           {
            !props.facebook?
            <Iframe 
            className={styles.responsive}
            url={"https://player.twitch.tv/?channel="+props.challengeData.livestreamUrl.S+"&parent=ggs-latam.vercel.app"}
                id="myId"
                display="initial"
                position="relative"
                frameBorder={0}
                styles={{borderRadius: '10px'}}/>
                :null
           } 
        </div>
  );
}