import React from 'react'; 
import { useUsersDataContext } from '../context/firebaseData/UsersData';
// import './WhatsAppInterface.css'; 
 
const {UsersData} = useUsersDataContext()
 
const WhatsAppInterface = () => { 
  return ( 
    <div className="whatsapp-container"> 
      {UsersData.map((user, index) => ( 
        <div key={index} className="user-card"> 
          <img src={user.avatar} alt={user.name} className="avatar" /> 
          <div className="user-info"> 
            <div className="user-name">{user.name}</div> 
            <div className="user-name">{user.email}</div> 
          </div> 
        </div> 
      ))} 
    </div> 
  ); 
}; 
 
export default WhatsAppInterface;