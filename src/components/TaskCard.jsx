import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { app } from "../firebase";
import {
  getFirestore,
  doc,
  deleteDoc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  updateDoc,
  addDoc,
  getDoc,
} from "firebase/firestore";
import { useShowPopupContext } from "../context/showPopup";
import { useUpdateDataContext } from "../context/updateData";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { GiWhiteBook } from "react-icons/gi";
import { useUserContext } from "../context/userData";
const db = getFirestore(app);

const TaskCard = ({ task }) => {
  const { show, setShow } = useShowPopupContext();
  const { dataObj, setDataObj } = useUpdateDataContext();
  const [logState, setLogState] = useState(false);
  const { user } = useUserContext();
  console.log(user);
  // const [username, setUsername] = useState([]);
  // const [selectedUser, setSelectedUser] = useState('');

  // const usersRef = collection(db, "users");

  // const completeTask = (taskId) => {
  //   console.log(`Task ${taskId} completed`);
  // };

  const handleEdit = () => {
    setDataObj({ ...task, what: "edit" });
    setShow(true);
    setLogState(true); // Trigger logging
  };

  const deleteBook = async (taskId, taskqty, taskName) => {
    const confirmed = window.confirm(
      `Are you sure you want to proceed with deleting ${taskName}?`
    );
    if (confirmed) {
      const issuedeleteref = doc(db, "bookdata", taskId);
      if (parseInt(taskqty) == 1) {
        await deleteDoc(issuedeleteref);
      } else {
        await updateDoc(issuedeleteref, {
          Quantity: parseInt(taskqty) - 1,
        });
      }
    } else {
      console.log("Action canceled by user");
    }
  };
  const handleIssue = async () => {
    // Show confirmation dialog
    const confirmIssue = window.confirm("Are you sure you want to request for issue this book?");
    if (!confirmIssue) {
      return; // Exit if the user does not confirm
    }
  
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 7);
  
    const issueref = collection(db, "issue");
    console.log(user.id);
    // const bookref = doc(db,"bookdata",task.id)
  
    try {
      await addDoc(issueref, {
        bookId: task.id,
        userId: user.uid,
        borrowdate: currentDate.toISOString(), // Set current date
        duedate: futureDate.toISOString(), // Set due date
        retunedate: "",
        latefees: "",
        IssueRequest: false,
      });
      // await updateDoc(bookref{
      //   Quantity:parseInt(task.Quantity) - 1;
      // })
      alert("Issue Request Sent To Admin");
    } catch (error) {
      alert("Error sending Request for issuing book:", error);
    }
  };

  useEffect(() => {
    if (logState) {
      setLogState(false); // Reset the logging state
    }
  }, [dataObj, logState]);

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(usersRef, (snapshot) => {
  //     const usernames = snapshot.docs.map(doc => doc.data().Name);
  //     setUsername(usernames);
  //   });

  //   return () => unsubscribe();
  // }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <div className="taskCard">
      <div className="bookInfo">
        <div className="bookPhoto">
          <img src={task.bookimg} alt="Book Cover" />
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
        {user.Role === "Admin" && (
          <div style={{display:'flex',gap:'2vw'}}>
            <p onClick={() => deleteBook(task.id, task.Quantity, task.Title)}>
              <MdDelete />
            </p>
            <p onClick={handleEdit}>
              <FaEdit />
            </p>
          </div>
        )}
        {user.Role === "User" && (
          <p onClick={()=>{handleIssue(task)}}>
            <GiWhiteBook />
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
