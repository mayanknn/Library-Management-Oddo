 import {React, useState} from 'react'
import NavUser from './NavUser'
import Dashboard3 from './Dashboard3'
 function UserPanel() { 
  const [count, setCount] = useState(0) 
 
  return ( 
    <div className="main"> 
 
      {/* <Popup/> */} 
      <NavUser /> 
      <Dashboard3/> 
      </div> 
  ) 
} 
 
export default UserPanel