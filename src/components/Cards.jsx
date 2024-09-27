import React, { useEffect, useState, useCallback } from 'react';
import Card from './Card.jsx';
import './Dashboard.css';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { app } from '../firebase.js';

const db = getFirestore(app);
const refcol = collection(db, 'tasks');
const usercol = collection(db, 'users');

const Cards = () => {
  const [count, setCount] = useState(0);  
  const [ucount, setUcount] = useState(0);

  const fetchData = useCallback(() => {
    const unsubscribeTasks = onSnapshot(refcol, (snapshot) => {
      setCount(snapshot.size);
    });

    const unsubscribeUsers = onSnapshot(usercol, (snapshot) => {
      setUcount(snapshot.size);
    });

    return () => {
      unsubscribeTasks();
      unsubscribeUsers();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = fetchData();
    return () => unsubscribe();
  }, [fetchData]);

  return (
    <div className="cards">
      <Card title="Tasks" subtitle={count} />
      <Card title="Users" subtitle={ucount} />
    </div>
  );
};

export default Cards;
