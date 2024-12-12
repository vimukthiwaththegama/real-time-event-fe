// src/App.js
import React from 'react';
import StartStop from './components/StartStop';
import VendorInfo from './components/VendorInfo';
import CustomerInfo from './components/CustomerInfo';
import ForumConf from './components/ForumConf';
import RealTimeLogs from './components/RealTimeLogs';
import HeaderBar from './components/HeaderBar';

const App = () => {
  return (
    <div>
      <header>
      </header>
      <HeaderBar/>
      <StartStop />
      <VendorInfo />
      <CustomerInfo />
      <ForumConf />
      <RealTimeLogs />
    </div>
  );
};

export default App;