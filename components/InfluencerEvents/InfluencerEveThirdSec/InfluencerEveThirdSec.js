import Card from '../../Dashboard/DashboardSecComp/CardComponent/CardComponent.js'
import styles from './css/styles.module.css';
import {useState} from 'react';
import Button from '@material-ui/core/Button';

export default function InfluencerEveThirdComp(){

    const[cardCount, setCardCount]=useState(1);

    let jsonData=[{
        'img':'https://cdn.dnaindia.com/sites/default/files/styles/full/public/2020/10/22/933055-pubg-2.jpg',
        'title':'Call Of Duty',
        'type':'Description',
        'spots':'4/25',
        'reward':'Special Dragon Gun Unlock'
    },
    {
        'img':'https://uhdwallpapers.xyz/media/images/ori/2020/01/20/call-of-duty-mobile-4k-wallpaper-9998901579538582.jpg',
        'title':'Fortnite',
        'type':'Description',
        'spots':'4/25',
        'reward':'Special Dragon Gun Unlock'
    },
    {
        'img':'https://specials-images.forbesimg.com/imageserve/5d1623e134a5c4000849d63f/960x0.jpg?fit=scale',
        'title':'PUBG Mobile',
        'type':'Description',
        'spots':'4/25',
        'reward':'Special Dragon Gun Unlock'
    },
    {
        'img':'https://cdn2.unrealengine.com/14br-consoles-1920x1080-wlogo-1920x1080-432974386.jpg',
        'title':'Battlefeild',
        'type':'Description',
        'spots':'4/25',
        'reward':'Special Dragon Gun Unlock'
    },
    {
        'img':'https://static.digit.in/default/7793d6be1d182149915ee40070d01cdba3a39550.jpeg',
        'title':'Free Fire',
        'type':'Description',
        'spots':'4/25',
        'reward':'Special Dragon Gun Unlock'
    }
]

const getElements=()=>{
    let elements = [];
    for( let i=0;i<jsonData.length;i++){
        let item=jsonData[i];
        elements.push(
            <Card title={item.title} 
                            src={item.img} 
                            spots={item.spots} 
                            type={item.type} 
                            remainingTime={item.remainingTime}
                            />
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
   return <div key={index}>{item}</div>
}))
separateElements.push(oneRow.map((itm, index) => {return <div key={index} className={styles.cardContainer}>{itm}</div>}))
}
return separateElements;
}


    return(
        <div className={styles.main}>
             <div className={styles.cardSection}>
             <div className={styles.heading}>
             <span style={{color:'#8A2BE2'}}>Torneos</span> disponibles
            </div>
            
            {separateElement().splice(0,cardCount)
            .map((itemArr,index)=>{return(<div key={index} >{itemArr}</div>)})
            }
            
            <div className={styles.heading}>
                <Button variant="contained" color="primary" size='large' 
                onClick={()=>setCardCount(cardCount+1)}
                style={{background:'#8A2BE2', 
                        fontSize:'0.9vw', 
                        padding:'0.7vw 4vw', 
                        marginTop:'2vw'}}>
                Show More
                </Button>
            </div>
            </div>
        </div>
        )
}