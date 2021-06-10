import styles from './css/styles.module.css';

export default function DashboardThrdComp(props) {
    return(
        <div>
            <img className={styles.img} src={props.src} alt=""/>
            <div className={styles.textContent}>
                <div className={styles.sameLineEvent}>
                    <div className={styles.title}>{props.title}</div>
                    <div className={styles.title} style={{color:'#8A2BE2'}}>{props.price}</div>
                </div>
                <p style={{color:'#d8d8d8',textAlign:'start', fontSize:'1vw'}}>
                {props.description}
                </p>
            </div>
        </div>
    )
}