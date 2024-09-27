import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";

import { app } from "../firebase";

import {
  getFirestore,
  getDoc,
  setDoc,
  doc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useBookDataContext } from "../context/firebaseData/BookData";
const db = getFirestore(app);
const tskref = collection(db, "tasks");

const Tasks = ({ showPopup, setShowPopup }) => {
  const { bookData } = useBookDataContext();
  return (
    <div className="tasks">
      {bookData.map((eachTask) => (
        <TaskCard key={eachTask.id} task={eachTask} />
      ))}
    </div>
  );
};

export default Tasks;
