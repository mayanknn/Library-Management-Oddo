import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { GoogleAuthProvider, signInWithPopup, getAuth, signInWithEmailAndPassword } from "firebase/auth"; 
import { app } from './firebase'; 
import './LogIn.css'; 
import { getFirestore, getDocs, query, collection, where,doc,getDoc,setDoc } from "firebase/firestore"; 
import { useUserContext } from './context/userData'; 
 
function LogIn() { 
  const { setUser } = useUserContext(); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
   
  const auth = getAuth(app); 
  const db = getFirestore(app); 
  const userref = collection(db, "users"); 
  const taskref = collection(db, "tasks"); 
  const provider = new GoogleAuthProvider(); 
  const navigate = useNavigate(); 
 
  // Function to handle Google sign-in 
  const openGoogle = async () => { 
    try { 
      const result = await signInWithPopup(auth, provider); 
      const user = result.user; 
   
      
      const { uid, displayName, email, photoURL } = user; 
      console.log(uid); 
   
      
      const userDocRef = doc(db, 'users', uid);  
   
      const docSnap = await getDoc(userDocRef); 
      if (docSnap.exists()) { 
         
        const querySnapshot = await getDocs(query(userref, where('Email', '==', email))); 
        const userData = querySnapshot.docs[0].data(); 
        console.log(userData) 
        setUser(userData); 
      } else { 
         
        await setDoc(userDocRef, { 
          Name: displayName, 
          Email: email, 
          ProfileImage: photoURL, 
          Role: 'User' 
        }); 
        console.log('User signed in for the first time and data stored in Firestore:', user); 
      } 
       
   
      // Optionally, you can redirect here after successful Google sign-in 
      navigate('/main'); 
    } catch (error) { 
      alert(error); 
    } 
  };

 
  // Function to handle email/password login 
  const logcheck = async () => { 
    if (email === '' || password === '') { 
      alert('Both email and password fields are Required. Please fill them out.'); 
      return; 
    } 
 
    try { 
      // Sign in the user 
      await signInWithEmailAndPassword(auth, email, password); 
   
      // Query Firestore to check if user exists 
      const querySnapshot = await getDocs(query(userref, where('Email', '==', email))); 
   
      if (querySnapshot.empty) { 
        console.log('No such user!'); 
        return; 
      } 
   
      // User exists, proceed with login 
      const userData = querySnapshot.docs[0].data(); 
      const username = querySnapshot.docs[0].data().Name; 
      const querySnapshot1 = await getDocs(query(taskref, where('assignedTo', '==', username))); 
      console.log(querySnapshot.docs[0].data) 
 
      setUser(userData);  // Setting user data in context 
      console.log("Login successful:", userData); 
       
      // Navigate to profile page or dashboard 
      navigate('/main'); 
    } catch (error) { 
      alert("User Not Found"); // Display error message 
    } 
  }; 
 
  return ( 
    <div className='outer-login'> 
      <div className="log_in"> 
        <h1>Login</h1> 
        <div className="mb-3"> 
          <label htmlFor="exampleInputEmail1" className="htmlForm-label">Email</label><br /> 
          <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} className="EmailControl" id="nameInput" aria-describedby="emailHelp" name="email" /> 
        </div> 
        <div className="mb-3"> 
          <label htmlFor="exampleInputPassword1" className="htmlForm-label">Password</label><br /> 
          <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="PasswordControl" id="exampleInputPassword1" name="password" /> 
        </div> 
        <Link to='/forgot'>Forgot Password</Link> 
        <br /> 
        <button type="button" className="btn_sub" onClick={logcheck} id="sub_btn">Log In</button> 
        <br /> 
        <h3>Don't Have an Account Yet ? <Link to='/signup'>Sign UP</Link></h3> 
        <br /> 
        <span className="Methods">OR LOGIN WITH</span> 
        <br /> 
        <div className="handles"> 
          <button onClick={openGoogle} className='google'></button> 
        </div> 
      </div> 
    </div> 
  ); 
} 
 
export default LogIn;