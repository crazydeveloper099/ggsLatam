import styles from './css/styles.module.css';
import Particles from '../../particles/ParticlesBackground.js'
import React from "react";
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import Carousel from 'react-bootstrap/Carousel'
import axios from 'axios';
import {IS_DEV, DEV_URL, PROD_URL} from '../../../Constants/Constants.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useState,useEffect} from 'react';
import socketIOClient from "socket.io-client";
import {  MDBIcon } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
export default function EventsFirstSec(props) {





return (
      <Carousel fade 
      nextIcon={<MDBIcon icon="chevron-circle-right" style={{fontSize:'5vh'}} />}
      prevIcon={<MDBIcon icon="chevron-circle-left" style={{fontSize:'5vh'}} />}
      >
      {
        props.isDoneFetchning?
        props.challengeData[5].map(item=>{
          return(
          <Carousel.Item key={item.id}>
          <div className={styles.bendingImgBackTint}>
            </div>
            <img
              className={styles.imgDashboard}
              src={item.image_url}
              alt="First slide"
            />
            <Carousel.Caption className={styles.captionStyle}>
              <h3 className={styles.h1}>{item.title}</h3>
              <p className={styles.pTag}>
              {item.description}
              </p>

                <Link href={item.href}>
                <Button variant="contained" color="primary" size='large' 
                className={styles.blueButton}>
                  PARTICIPA AHORA
                </Button>
                </Link>
            </Carousel.Caption>
      </Carousel.Item>
          )
    })
    :
    <div className={styles.loadingContainer}>
        <CircularProgress color="inherit" />
      </div>    
      }
    </Carousel>
  )
  
}
