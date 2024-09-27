import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import './ForgotPage.css'

import { sendPasswordResetEmail ,getAuth } from 'firebase/auth';
import { app } from './firebase';

function ForgotPage() { 
  const auth =  getAuth(app)
  const [emailval,setEmailval] = useState('');
  const resetchange = async() => {
    sendPasswordResetEmail(auth,emailval);
  }
  return (
    <div className='forgot-main'>
    <div className='Forgot_Page'>
      <span className='span_1'>Enter you Email Id</span>
      <input type="email" onChange={(e) => setEmailval(e.target.value)} value={emailval}/>
      <button onClick={resetchange}>Send Reset Link</button>
      <span className='span_2'>Back to <Link to='/'>LogIn</Link> Page </span>
    </div>
    </div>
  )
}

export default ForgotPage
