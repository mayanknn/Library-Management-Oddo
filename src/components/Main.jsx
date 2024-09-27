import React from 'react';
import Nav from './Nav';
import './Main.css'
import Dashboard2 from './Dashboard2';
import { useState } from 'react';
import Profile from './Profile';
import { useUpdateDataContext } from '../context/updateData';
const Main = () => {
  const { showProfile } = useUpdateDataContext();
    
    return (
      <div className="main">
        {(
        showProfile ? (
          <Profile />
        ) : (
          <Nav />
        )
      )}        
        
        <Dashboard2 />
    </div>
  );
};

export default Main;