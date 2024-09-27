import React from 'react'; 
import { useState } from 'react'; 
import { Link } from 'react-router-dom'; 
import { app } from './firebase'; 
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'; 
import { getFirestore, collection, addDoc } from 'firebase/firestore'; 
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'; 
import './SignUP.css'; 
 
 
const auth = getAuth(app); 
const db = getFirestore(app); 
const imgdb = getStorage(app) 
 
function SignUp() { 
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [role, setRole] = useState(''); 
  const [phone, setPhone] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [cpassword, setCpassword] = useState(''); 
  const [profileImage, setProfileImage] = useState(null); 
   
  const validate = () => { 
    if (!name) { 
      alert("Name is required"); 
      return false; 
    } 
    if (!email) { 
      alert("Email is required"); 
      return false; 
    } 
    if (!phone) { 
      alert("Phone number is required"); 
      return false; 
    } 
    if (!role) { 
      alert("Role is required"); 
      return false; 
    } 
    if (!password) { 
      alert("Password is required"); 
      return false; 
    } 
    if (password.length < 6) { 
      alert("Password must be at least 6 characters"); 
      return false; 
    } 
    if (!cpassword) { 
      alert("Confirm Password is required"); 
      return false; 
    } 
    if (password !== cpassword) { 
      alert("Passwords do not match"); 
      return false; 
    } 
    return true; 
  }; 
 
  const createUser = async () => {  
    if (validate()) {  
      const result = await createUserWithEmailAndPassword(auth, email, password);  
      const user = result.user; 
      const {uid} = user; 
      insert(uid);  
      alert('Success');  
    }  
  };
 
  const userref = collection(db, 'users'); 
  const insert = async (id) => { 
    const imgRef = ref(imgdb, `uploads/books/${Date.now()}-${profileImage.name}`); 
    const uploadResult = await uploadBytes(imgRef, profileImage); 
    const downloadURL = await getDownloadURL(uploadResult.ref); 
 
    await addDoc(userref, { 
      uid: id,
      Name: name, 
      Email: email, 
      Phone: phone, 
      Role: role, 
      Password: password, 
      ProfileImage:downloadURL 
    });
    
  }; 
 
  // const handleImageChange = (e) => { 
  //   if (e.target.files[0]) { 
  //     setProfileImage(e.target.files[0]); 
  //   } 
  // }; 
 
  return ( 
    <div className='outer'> 
      <div className="sign_up"> 
        <h1>Register</h1> 
        <table> 
          <tbody> 
            <tr> 
              <td><label htmlFor="name" className="form-label">Name</label></td> 
              <td><input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" id="name" name="name" required /></td> 
            </tr> 
            <tr> 
              <td><label htmlFor="profileImage" className="form-label">Profile Image</label></td> 
              <td><input type="file" onChange={(e) => setProfileImage(e.target.files[0])} className="form-control" id="profileImage" name="profileImage" /></td> 
            </tr> 
            <tr> 
              <td><label htmlFor="email" className="form-label">Email</label></td> 
              <td><input type="text" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" id="email" name="email" required /></td> 
            </tr> 
            <tr> 
              <td><label htmlFor="phone" className="form-label">Phone No.</label></td> 
              <td><input type="tel" onChange={(e) => setPhone(e.target.value)} value={phone} className="form-control" id="phone" name="phone" required /></td> 
            </tr> 
            <tr> 
              <td><label htmlFor="roles" className="form-label">Roles</label></td> 
              <td> 
                <select name="roles" id="roles" className="form-control" onChange={(e) => setRole(e.target.value)} value={role} required> 
                  <option value="">Select Role</option> 
                  <option value="Admin">Admin</option>
                  <option value="User">User</option> 
                </select> 
              </td> 
            </tr> 
            <tr> 
              <td><label htmlFor="password" className="form-label">Password</label></td> 
              <td><input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" id="password" name="password" required /></td> 
            </tr> 
            <tr> 
              <td><label htmlFor="cpassword" className="form-label">Confirm Password</label></td> 
              <td><input type="password" onChange={(e) => setCpassword(e.target.value)} value={cpassword} className="form-control" id="cpassword" name="cpassword" required /></td> 
            </tr> 
          </tbody> 
        </table> 
 
        <br /> 
        <button onClick={createUser} className='btn_signin'><Link to='/' className='link_style'>Sign In</Link></button> 
        <br /> 
 
        <h3 className='already'>Already Have an Account Yet? <Link to="/">LogIn</Link></h3> 
      </div> 
    </div> 
  ); 
} 
 
export default SignUp;