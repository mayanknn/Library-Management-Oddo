import React, { useEffect, useState } from 'react'; 
 
import { MdDelete } from "react-icons/md"; 
import { FaEdit } from "react-icons/fa"; 
import { GiWhiteBook } from "react-icons/gi"; 
const UserTaskCard = ({ task }) => { 
  
  return ( 
    // <div className="taskCard"> 
    //   <div className="leftTask"> 
    //     <div className="taskTitle"> 
    //       <input 
    //         type="checkbox" 
    //         id={`checkbox_${task.id}`} 
    //         onChange={() => completeTask(task.id)} 
    //         checked={task.completed} 
    //       /> 
    //       {task.task} 
    //     </div> 
    //     <div className="taskDueDate">{task.dueDate}</div> 
    //   </div> 
    //   <div className="rightTask"> 
    //     <p onClick={() => deleteTask(task.id, task.task)}>delete</p> 
    //     <p onClick={handleEdit}>edit</p> 
    //     <select onChange={(e) => setSelectedUser(e.target.value)}> 
    //       <option value="">Select User</option> 
    //       {username.map((user) => ( 
    //         <option key={user} value={user}> 
    //           {user} 
    //         </option> 
    //       ))} 
    //     </select> 
    //     <button onClick={() => assignTask(task.id)}>ASSIGN</button> {/* Fixed onClick handler */} 
    //     <div className="taskShow">Show Details</div> 
    //   </div> 
    // </div> 
    <div className="taskCard"> 
  <div className="bookInfo"> 
    <div className="bookPhoto"> 
      <img src={task.Photo} alt="Book Cover" /> 
    </div> 
    <div className="bookData"> 
      <div className="ISBN">{task.ISBN}</div> 
      <div className="title">{task.Title}</div> 
      <div className="author">Author: {task.Author}</div> 
      <div className="author">Publisher: {task.Publisher}</div> 
      <div className="author">Publication Year: {task.Year}</div> 
      <div className="author">Genre: {task.Genre}</div> 
      <div className="author">Availability: {task.Availability}</div> 
      <div className="author">Quantity: {task.Quantity}</div> 
    </div> 
  </div> 
  <div className="operations"> 
    
    <p><GiWhiteBook /></p> 
  </div> 
</div> 
  ); 
}; 
 
export default UserTaskCard;