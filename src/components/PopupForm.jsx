import React, {useState, useEffect} from 'react'
import { collection, addDoc, getFirestore, doc,updateDoc } from 'firebase/firestore';
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { IoCloseOutline } from "react-icons/io5";
import { useShowPopupContext } from '../context/showPopup';
import { useUpdateDataContext } from '../context/updateData';

function PopupForm({ heading }) {
    const [isbn,setIsbn] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher,setPublisher] = useState('');
    const [year,setYear] = useState('');
    const [genre,setGenre] = useState('');
    const [quantity,setQuantity] = useState('');
    const [bookimg,setBookimg] = useState(null);
    const db = getFirestore(app);
    const imgdb = getStorage(app)
    const { show, setShow } = useShowPopupContext();
    const { dataObj } = useUpdateDataContext();
    console.log(dataObj.id)
    useEffect(() => {
        if (dataObj.what === 'edit') {
          setIsbn(dataObj.ISBN || '')
          setTitle(dataObj.Title || '')
          setAuthor(dataObj.Author || '')
          setPublisher(dataObj.Publisher || '')
          setYear(dataObj.Year || '')
          setGenre(dataObj.Genre || '')
          setQuantity(dataObj.Quantity || '')
          setBookimg(dataObj.bookimg || '')
        }
      }, [dataObj]);
    const addBook = async () => {
    try {
        const bookRef = collection(db, 'bookdata');
        const imgRef = ref(imgdb, `uploads/books/${Date.now()}-${bookimg.name}`);
        const uploadResult = await uploadBytes(imgRef, bookimg);
        const downloadURL = await getDownloadURL(uploadResult.ref);
        await addDoc(bookRef, {
        ISBN: isbn,
        Title: title,
        Author: author,
        Publisher: publisher,
        Year: year,
        Genre: genre,
        Quantity: quantity,
        bookimg: downloadURL
        });
        // Clear form fields after submission
        setIsbn('');
        setTitle('');
        setAuthor('');
        setPublisher('');
        setYear('');
        setGenre('');
        setQuantity('');
        setBookimg(null);
        setShow(false); // Close popup after successful submission
        console.log("Book added successfully");
    } catch (error) {
        console.error("Error adding book: ", error);
        // Handle error (show error message to the user)
    }
    };
    const editBook = async () => {
        console.log(dataObj.id)
        const issueupdateref = doc(db,"bookdata",dataObj.id);
        const imgRef = ref(imgdb, `uploads/books/${Date.now()}-${bookimg.name}`);
        const uploadResult = await uploadBytes(imgRef, bookimg);
        const downloadURL = await getDownloadURL(uploadResult.ref);
        await updateDoc(issueupdateref,{
            ISBN:isbn,    
            Title:title,
            Author:author,    
            Publisher:publisher,
            Year:year,    
            Genre:genre,
            Quantity:quantity,    
            bookimg:downloadURL
        })
    }
    function handleTask() { 
        if (dataObj.what === 'add') { 
          addBook(); 
        } else if (dataObj.what === 'edit') { 
          editBook(); 
        } 
      }

  return (
    <div className="popup">
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', alignItems: 'center', height: '8vh' }}>
        <h2 style={{ width: '90%', textAlign: 'center', padding: 0, margin: 0 }}>{heading}</h2>
        <IoCloseOutline style={{ cursor: 'pointer' }} onClick={() => setShow(false)} className='cross' />
      </div>

      <label htmlFor="taskName">ISBN:</label>
      <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} id="taskName" name="title" required />

      <label htmlFor="description">Book Title :</label>
      <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} id="description" name="description" rows="4" />

      <label htmlFor="description">Author Name :</label>
      <input type='text' value={author} onChange={(e) => setAuthor(e.target.value)} id="description" name="description" rows="4" />

      <label htmlFor="description">Publisher Name :</label>
      <input type='text' value={publisher} onChange={(e) => setPublisher(e.target.value)} id="description" name="description" rows="4" />

      <label htmlFor="dueDate">Year :</label>
      <input type="date" value={year} onChange={(e) => setYear(e.target.value)} id="dueDate" name="dueDate" required />

      <label htmlFor="priority">Genre : </label>
      <select value={genre} onChange={(e) => setGenre(e.target.value)} id="priority" name="priority">
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        <option value="Thriller">Thriller</option>
        <option value="Rom">Rom Com</option>
        <option value="Documentary">Documentary</option>
      </select>

      <label htmlFor="profileImage" className="form-label">Book Image</label> 
      <input type="file" onChange={(e) => setBookimg(e.target.files[0])} className="form-control" id="profileImage" name="profileImage" />

      <label htmlFor="description">Quantity :</label>
      <input type='text' value={quantity} onChange={(e) => setQuantity(e.target.value)} id="description" name="description" rows="4" />

      <input type="submit" value="Submit" onClick={handleTask}/>

    </div>
  )
}

export default PopupForm
