import React, { useState ,useEffect} from 'react'; 
import { FaSearch } from "react-icons/fa"; 
import Tasks from './Tasks'; 
 
 
 
 
 
const Dashboard3 = () => { 
   
  
  return ( 
    <div className='dashboard'> 
       
      <div className="sort-filter"> 
        <div className="sort"> 
          <select name="sortOption" id="sortOption" onChange={(e) => setSort(e.target.value)}> 
            <option value="">Sort by...</option> 
            <option value="title">Sort by Title</option> 
            <option value="due">Sort by Due Date</option> 
            <option value="priority">Sort by Priority</option> 
          </select> 
        </div> 
        <div className="search-container"> 
          <input type="text" className="search-input" placeholder="Search Tasks" /> 
          <FaSearch className="search-icon" /> 
        </div> 
        <div className="filter">FILTER</div> 
      </div> 
      <Tasks /> 
       
    </div> 
  ); 
} 
 
export default Dashboard3;