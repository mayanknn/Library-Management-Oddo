import React, { useState, useEffect } from 'react'; 
import { FaSearch } from "react-icons/fa"; 
import Cards from './Cards'; 
import Tasks from './Tasks'; 
import Popup from './Popup'; 
import { useShowPopupContext } from '../context/showPopup'; 
import { useUpdateDataContext } from '../context/updateData'; 
import './Dashboard.css'; 
import PopupForm from './PopupForm';
import { useReqPopupContext } from '../context/popup2'; 
import { useBookDataContext } from '../context/firebaseData/BookData';
import ReqPopupComp from './ReqPopupComp';

const Dashboard2 = () => { 
  const { reqShow, setReqShow } = useReqPopupContext();
  const { show } = useShowPopupContext(); 
  const { dataObj } = useUpdateDataContext(); 
  const { search, setSearch } = useBookDataContext(); 
  const [isVisible, setIsVisible] = useState(true); 
   
  

  useEffect(() => { 
    const timeout = setTimeout(() => { 
      setIsVisible(false); 
    }, 3000); // 3 seconds 

    return () => clearTimeout(timeout); 
  }, []); 

  return ( 
    <div className='dashboard'> 
      {isVisible && <p className="notification show">Login Successfully</p>} 

      <div className="sort-filter"> 
        <div className="search-container"> 
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search Tasks" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
          /> 
          <FaSearch className="search-icon" /> 
        </div> 
        <div className="filter">FILTER</div> 
      </div> 

      {show && ( 
        <PopupForm heading={dataObj.what === "add" ? "Add Book" : "Update Book Details"} /> 
      )} 

      {reqShow && <ReqPopupComp />} 
      
      
      
      <Tasks /> 
    </div> 
  ); 
} 

export default Dashboard2;
