import React from 'react';
import { IoCloseOutline } from "react-icons/io5";
import './Main.css';
import { useUpdateDataContext } from '../context/updateData';
import { useUserContext } from '../context/userData';

const Profile = () => {
  const { user } = useUserContext();
  const { setShowProfile } = useUpdateDataContext();
  
  console.log("profile ", user);

  const handleLogout = (e) => {
    // Prevent the default action
    e.preventDefault();

    // Show confirmation dialog
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      // Perform logout logic here
      // Then redirect
      window.location.href = '/'; // Adjust as needed
    }
  };

  return (
    <div className='profile'>
      <div className='profile-box-image'>
        <img src={user.ProfileImage} alt="" />
      </div>
    
      <IoCloseOutline 
        style={{ cursor: 'pointer' }} 
        onClick={() => setShowProfile(false)} 
        className='cross' 
        id='profile-close'
      />
      <div className='name'>{user.Name}</div>
      <div className='email'>{user.Email}</div>
      <div className='phn'>{user.Phone}</div>
      <div className='role'>{user.Role}</div> {/* Changed class name for clarity */}
      <button onClick={handleLogout} className='logout'>
        Log Out
      </button>
    </div>
  );
};

export default Profile;
