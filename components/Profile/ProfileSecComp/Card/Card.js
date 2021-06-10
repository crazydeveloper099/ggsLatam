import styles from './css/styles.module.css';

export default function Card(props) {
    console.log(props.prize);
    return(
        <div className={styles.main}>
            <img src={props.img}
            className={styles.logo} 
            alt=""/>
            <div className={styles.gameName}>
                {props.gameName}
            </div>
            <div className={styles.textBoxRanking}>
                <div style={{textAlign:'center'}} className={styles.textBoxRankingFstTxt}>
                Jugado
                </div>
                <div className={styles.textBoxRankingSecTxt}>
                {props.type}
                </div>
            </div>
        
            <div className={styles.textBoxRanking}>
                <div className={styles.textBoxRankingSecTxt}>
                Challenge Time
                </div>
                <div className={styles.textBoxRankingFstTxt}>
                {props.challengeTime}
                </div>
                
            </div>
        </div>
    )
}