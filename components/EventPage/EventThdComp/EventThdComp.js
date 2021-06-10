import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabPanel/TabPanel.js'
import FirstTab from './FirstTab/FirstTab.js'
import SecondTab from './SecondTab/SecondTab.js'
import Particles from '../../particles/ParticlePositive/ParticlePositive.js'
import styles from './css/styles.module.css';

export default function EventThdComp(props) {

  const [value1, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <div >
    <Particles height='100%' zIndex='0'  />
      <AppBar 
      position="static" 
      color="default"
      style={{background:'transparent',boxShadow: 'none'}}>
        <Tabs
        
          value={value1}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant='fullWidth'>
          <Tab style={{outline:'none',color:'#87ceeb', fontFamily:'avenir'}} 
          className={styles.tabSize}
          label="Vista general" 
          id='full-width-tab-0' />
          <Tab style={{outline:'none',color:'#87ceeb', fontFamily:'avenir'}} 
          className={styles.tabSize}
          label="Jugadores" 
          id='full-width-tab-1' />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis='x-reverse'
        index={value1}
        onChangeIndex={handleChangeIndex}>

        <TabPanel  
        value1={value1} 
        index={0} 
        children={<FirstTab
            isLoading={props.isLoading}
            challengeData={props.challengeData}
             />}
        />

        <TabPanel 
        value1={value1} 
        index={1} 
        children={<SecondTab
            isLoading={props.isLoading}
            challengeData={props.challengeData}
             />}
        />
      </SwipeableViews>
    </div>
  );
}
