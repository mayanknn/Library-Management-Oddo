import React from 'react'; 
import { ImCross } from "react-icons/im"; 
import { SiTicktick } from "react-icons/si"; 
import { IoCloseOutline } from "react-icons/io5"; 
import { useReqPopupContext } from '../context/popup2'; 
import useRequestPendingDataContext from '../context/firebaseData/requestPendingData'; 
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { app } from '../firebase';

const ReqPopupComp = () => { 
  const { setReqShow } = useReqPopupContext();
  const { requestData } = useRequestPendingDataContext();
  const db = getFirestore(app)
  const handleIssue = async (request) => {
    const currentDate = new Date();
    var futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 7);
    console.log(futureDate)
    console.log(request)
    const issuerefupdate = doc(db,"issue");
    await updateDoc(issuerefupdate,{
      borrowdate:currentDate,    
      duedate:futureDate,
      IssueRequest:true
    })

const bookref = doc(db,"bookdata",taskid);await updateDoc(bookref,{
    Quantity:parseInt(task.Quantity)-1})
  }
  return ( 
    <div className="reqpopup"> 
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', alignItems: 'center', height: '8vh', backgroundColor: 'lightblue', position: 'absolute', top: '0' }}> 
        <h2 style={{ width: '90%', textAlign: 'center', padding: 0, margin: 0 }}>Issue Requests</h2> 
        <IoCloseOutline 
          style={{ cursor: 'pointer', position: 'absolute', top: '1vh' }} 
          onClick={() => setReqShow(false)} 
          className='cross' 
        /> 
      </div> 

      <div className="requestInfo"> 
        {requestData.map((request, index) => (
          <div key={index} className="requestItem">
           
            <h1 className='userrr'>{request.userName || 'Unknown'}</h1>
            <div className="bookInfo">
              <img src={request.bookimg} alt={request.bookName || 'Book'} />
              <h3>{request.bookName || 'Unknown'}</h3>
              <div style={{ position: 'absolute', right: '2vw', width: "30%", display: 'flex', justifyContent: "space-around" }}>
                <p style={{ fontSize: '1.5rem' }} onClick={()=>handleIssue(request)}><SiTicktick /></p>
                <p style={{ fontSize: '1.5rem' }} ><ImCross /></p>
              </div>
            </div>
          </div>
        ))}
      </div> 
    </div> 
  ); 
}; 

export default ReqPopupComp;
