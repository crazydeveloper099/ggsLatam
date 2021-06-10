import Footer from '../components/Footer/Footer.js'
import Header from '../components/Header/Header.js'
import LeaderboardFstCmp from '../components/Leaderboard/LeaderboardFstCmp/LeaderboardFstCmp.js'
import LeaderboardSecComp from '../components/Leaderboard/LeaderboardSecComp/LeaderboardSecComp.js';
import {useState, useEffect} from 'react';
import {IS_DEV, DEV_URL, PROD_URL} from '../Constants/Constants.js';
import axios from 'axios';

export default function Leaderboard() {

    return(
        <div style={{ backgroundColor:'#1b0020'}}>
            <Header />
            <LeaderboardFstCmp />
            <LeaderboardSecComp  />
            <Footer />
        </div>
    )
}
