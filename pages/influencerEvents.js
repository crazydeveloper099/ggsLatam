import InfluencerEveFirstSec from '../components/InfluencerEvents/InfluencerEveFirstSec/InfluencerEveFirstSec.js';
import InfluenceEveSecComp from '../components/InfluencerEvents/InfluencerEveSecComp/InfluencerEveSecComp.js';
import InfluenceEventsThirdSec from '../components/InfluencerEvents/InfluencerEveThirdSec/InfluencerEveThirdSec.js'
import InfluenceEventsFourthSec from '../components/InfluencerEvents/InfluencerEveFourthSec/InfluencerEveFourthSec.js'
import InfluencerEveFifthSec from '../components/InfluencerEvents/InfluencerEveFifthComp/InfluencerEveFifthSec.js'
import Header from '../components/Header/Header.js'
import Footer from '../components/Footer/Footer.js'

export default function Events() {
    return(
        <div style={{ backgroundColor:'#1b0020'}}>
            <Header />
            <InfluencerEveFirstSec />
            <InfluenceEveSecComp />
            <InfluenceEventsThirdSec />
            <InfluenceEventsFourthSec />
            <InfluencerEveFifthSec />
            <Footer />
        </div>
    )
}