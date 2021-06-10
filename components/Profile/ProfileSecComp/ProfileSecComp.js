import styles from './css/styles.module.css';
import Card from './Card/Card.js'
import CircularProgress from '@material-ui/core/CircularProgress';

export default function ProfileSecComp(props) {




    return(
        <div className={styles.main}>
            <div className={styles.heading} style={{textAlign:'center'}}>
            Mis <span style={{color:'#ff00ff'}}>Juegos</span>
            </div>
            
            {!props.isLoading?
                <>
            <div style={{width:'90vw'}}>
                {'challenges' in props.profileData?
                    JSON.parse(props.profileData.challenges.S)
                .map((item,index)=>{
                    return(
                        <Card 
                        key={index}
                        img={item.src}
                        gameName={item.challengeName}
                        // played={item.challengeType}
                        type={item.challengeType}
                        // prize={item.challengePrize}
                        challengeTime={item.challengeTime}
                    />
                    )
                })
                :
                <div className={styles.noResults}>
                    <img className={styles.logo} src="/logo.png" alt="" />
                    <div className={styles.heading}>
                    Aún no has participado en ningún evento
                    </div>
                </div>
                }
                
            </div>
            </>
            :
            <div className={styles.loadingContainer}>
                <CircularProgress color="inherit" />
            </div>
            }
        </div>
    )
}


