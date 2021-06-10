import styles from './css/styles.module.css';
import TodayChallenges from './TodayChallenges/TodayChallenges.js'
import Slider from "react-slick";

export default function InfluencerEveSecComp(){
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "-10px",
        slidesToShow: 3,
        speed: 1000,
        arrows:false,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
    };
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


    return(
        <div className={styles.main}>
             <div className={styles.heading}>
             <span style={{color:'#8A2BE2'}}>Retos</span> de hoy
            </div>
            <div className={styles.cardContainer}>
                <div className={styles.container}>
                    <Slider {...settings}>
                    {jsonData.map((item,index)=>{
                return(
                    <TodayChallenges 
                    key={index}
                    img={item.img} 
                    title={item.title} 
                    type={item.type}
                    reward={item.reward}  
                    />
                        )})}
                    </Slider>
                </div>    
            </div>
        </div>
    )
}