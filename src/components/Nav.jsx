import React from 'react';
import './Dashboard.css'
import { useShowPopupContext } from '../context/showPopup';
import { useUpdateDataContext } from '../context/updateData';
import { useUserContext } from '../context/userData';
import { useReqPopupContext } from '../context/popup2';

const Nav = ({}) => {
  const {show,setShow} = useShowPopupContext()
  const {setDataObj, setShowProfile} = useUpdateDataContext()
  const {user} = useUserContext()
  const {reqShow,setReqShow} = useReqPopupContext()
  function handleAdd(){
    setShow(true)
    setDataObj({what:'add'})
  }
  function handlereq(){
    setReqShow(true)
  }
  return (
    <nav>
      <h1 id="nav">Actions</h1>
      {user.Role === 'Admin' && (
    <div>
        {/* <button id="addUserButton">Add User</button> */}
        <button>Show All Users</button>
        <button id="addTaskButton" onClick={handleAdd}>Add Book</button>
        <button id="addTaskButton" onClick={handlereq}>Show request</button>
        
    </div>
)}
<div>
      <button>Show All Books</button>
      <button onClick={() => setShowProfile(true)}>Show Profile</button>
      </div>
    </nav>
  );
};

export default Nav;