import styles from './css/styles.module.css';
import Particles from '../../particles/ParticlePositive/ParticlePositive.js'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function ProfileFstComp(props) {
    return(
        <div>
            <div className={styles.ImgContainer}>
                <img src="/Profile.png" 
                alt=""
                className={styles.img}    
                />
                <Particles height='100%' zIndex='4' />
                {!props.isLoading?
                <>
                <div className={styles.firstBox}>
                    <div className={styles.initialsContainer}>
                        {props.profileData.email.S[0].toUpperCase()}
                    </div>
                    <div className={styles.firstBoxTextContainer}>
                        <div className={styles.heading}>
                        {props.profileData.name.S}
                        </div>
                        <div className={styles.smallText}>
                        <strong>{props.profileData.email.S}</strong>
                        </div>
                        {"mc_whitelisted" in props.profileData?
                        props.profileData.mc_whitelisted.BOOL==true?
                        <>
                        <span className={styles.smallText}>
                            Minecraft Username: <strong>{props.profileData.mcUsername.S}</strong>
                        </span>
                       
                        </>

                        :null
                        :null}
                        <div style={{display: 'flex', marginTop:'0.3vw'}}>
                            <div className={styles.earningsBox}>
                            Total ganado: &nbsp;&nbsp;<strong>{props.profileData.wallet_amount.S}</strong>
                            &nbsp;
                            <img src="/ggsCoin.png" className={styles.ggsCoin} alt="" />
                            </div>

                        </div>
                    </div>
                </div>
                        
                </>:
                <div className={styles.loadingContainer}>
                    <CircularProgress color="inherit" />
                </div>
                }
            </div>
            
        </div>
    )
}