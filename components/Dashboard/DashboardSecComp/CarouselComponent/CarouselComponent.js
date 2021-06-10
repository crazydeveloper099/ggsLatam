
import {useState, useEffect} from 'react';
import Slider from "react-slick";
import styles from './css/styles.module.css';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import HorizontalCarousel from './HorizontalCarousel/HorizontalCarousel.js'

export default function CarouselComponent() {

  const carouselHotz=[
    <HorizontalCarousel img1='/cod/warzone-3.jpg' img2='/cod/warzone-1.jpg' img3='/cod/warzone-2.jpg' title='Call Of Duty Warzone' />,
    <HorizontalCarousel img1='/lol/lol-1.jpg' img2='/lol/lol-2.jpg' img3='/lol/lol-3.jpg' title='League Of Legends' />,
    <HorizontalCarousel img1='/brawlStars/brawl-2.jpg' img2='/brawlStars/brawl-3.jpg' img3='/brawlStars/brawl-1.jpg' title='Brawl Stars' />,
    <HorizontalCarousel img1='/codm/cod-1.jpg' img2='/codm/cod-2.jpg' img3='/codm/cod-3.jpg' title='Call Of Duty Mobile' />,
    <HorizontalCarousel img1='/minecraft/mcraft-3.jpg' img2='/minecraft/mcraft-1.jpg' img3='/minecraft/mcraft-2.jpg' title='Minecraft' />
  ]

    const imgArr=['/Thumbs/warzoneThumb.jpg',
                    '/Thumbs/lolThumb.png',
                '/Thumbs/brawlStarsThumb.jpg',
            '/Thumbs/codmThumb.jpg',
        '/Thumbs/minecraftThumb.png']

    const[activeSlide, setActiveSlide]= useState(0)
  
    const renderSlides = () =>
    imgArr.map((src,index) => (
      <div key={index}>
        <img style={{width:'100%', height:'25vh', borderRadius:'10px'}} src={src} alt=""/>
      </div>
    ));


  const settings = {
    className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      vertical: true,
        slidesToShow: 3,
      slidesToScroll: 1,
        verticalSwiping: true,
        focusOnSelect: true,
        arrows:false,
      afterChange: current => setActiveSlide(current)
    };

    return(
        <div className={styles.main}>
        
        {/*Vertical Carousel */}
        <div style={{width:'21vw', position:'absolute',zIndex:'3',marginTop:'5vh'}}> 
        <div className={styles.heading} style={{color:'#9932CC', textAlign:'start'}}>
        Elige tu juego
        </div>
        <Slider {...settings} >{renderSlides()}</Slider>
        </div>
        
        {/*Right Content */}
        <div style={{
        width:'85vw', 
        marginLeft:'20vw',
        display:'flex',
        alignItems:'center',
        height:'90vh',
        marginTop:'12vh',
        justifyContent:'flex-end'}}>
                
               {carouselHotz[activeSlide]}
            
        </div>

        </div>
    )
}