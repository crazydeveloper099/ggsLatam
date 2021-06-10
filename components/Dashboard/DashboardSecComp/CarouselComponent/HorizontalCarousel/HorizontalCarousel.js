import React from "react";
import styles from '../../../../Events/EventsFirstSec/css//styles.module.css';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import Carousel from 'react-bootstrap/Carousel'
import {  MDBIcon } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


export default function HorizontalCarousel(props){
    return(
    
 <Carousel fade 
      nextIcon={<MDBIcon icon="chevron-circle-right" style={{fontSize:'5vh'}} />}
      prevIcon={<MDBIcon icon="chevron-circle-left" style={{fontSize:'5vh'}} />}
      >

          <Carousel.Item >
          <div className={styles.bendingImgBackTintDashboard}>
            </div>
            <img
              className={styles.imgDashboard2}
              src={props.img1}
              alt="First slide"
            />
            <Carousel.Caption className={styles.captionStyle}>
              <h3 className={styles.h1}>{props.title}</h3>
              <p className={styles.pTag}>
              Gana increíbles premios jugando
              </p>

              <Link href="/register">
            <Button variant="contained" color="primary" size='large' 
            style={{background:'#8A2BE2', 
                    fontSize:'1vw', 
                    padding:'1vw 5vw', 
                    marginTop:'2vw'}}>
              PARTICIPA AHORA
            </Button>
            </Link>
            </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item >
          <div className={styles.bendingImgBackTintDashboard}>
            </div>
            <img
              className={styles.imgDashboard2}
              src={props.img2}
              alt="First slide"
            />
            <Carousel.Caption className={styles.captionStyle}>
              <h3 className={styles.h1}>{props.title}</h3>
              <p className={styles.pTag}>
              Gana increíbles premios jugando
              </p>

              <Link href="/register">
            <Button variant="contained" color="primary" size='large' 
            style={{background:'#8A2BE2', 
                    fontSize:'1vw', 
                    padding:'1vw 5vw', 
                    marginTop:'2vw'}}>
              PARTICIPA AHORA
            </Button>
            </Link>
            </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item >
          <div className={styles.bendingImgBackTintDashboard}>
            </div>
            <img
              className={styles.imgDashboard2}
              src={props.img3}
              alt="First slide"
            />
            <Carousel.Caption className={styles.captionStyle}>
              <h3 className={styles.h1}>{props.title}</h3>
              <p className={styles.pTag}>
              Gana increíbles premios jugando
              </p>

              <Link href="/register">
            <Button variant="contained" color="primary" size='large' 
            style={{background:'#8A2BE2', 
                    fontSize:'1vw', 
                    padding:'1vw 5vw', 
                    marginTop:'2vw'}}>
              PARTICIPA AHORA
            </Button>
            </Link>
            </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    )
}