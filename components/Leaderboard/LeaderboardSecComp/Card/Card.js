import styles from './css/styles.module.css'

export default function Card(props){
    console.log(props);
    let initials=props.name.indexOf(' ') > 0?
    props.name.split(' ')[0][0]+props.name.split(' ')[1][0]:
    props.name[0]

    let colors= [ 'fuchsia', 'green', 
    'lime', 'navy', 'olive', 'orange', 'purple', 
    'teal'];

    const randPicker=(colors)=> {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    

    return(
       <div className={styles.card}>
        <div className={styles.firstBox}>
            <div className={styles.index}>
                {props.index}
            </div>
            <div className={styles.initialsContainer} >
                {initials}
            </div>
            <span className={styles.spanEmailName}>
            <div className={styles.nameContainer}>
                {props.name}
            </div>
            
            </span>
        </div>
        <div className={styles.secondBox}>
            {props.prize}
        </div>
       </div> 
    )
}