import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { app } from '../../firebase';

const UsersDataContext = createContext();

export const useUsersDataContext = () => useContext(UsersDataContext);

export const UsersDataProvider = ({ children }) => {
  const [UsersData, setUsersData] = useState([]); 
  const [showUsers,setShowUsers] = useState(false);
  const db = getFirestore(app);

  useEffect(() => {
    // Function to set up Firestore listener
    const setupListener = () => {
      const refe = collection(db, 'Users');
      const unsubscribe = onSnapshot(refe, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUsersData(data);
      });

      // Clean up the listener when the component unmounts
      return () => unsubscribe();
    };

    // Set up Firestore listener
    const unsubscribe = setupListener();

    // Clean up Firestore listener on unmount
    return () => unsubscribe();

  }, [db]);

  return (
    <UsersDataContext.Provider value={{UsersData, setUsersData,showUsers,setShowUsers }}>
      {children}
    </UsersDataContext.Provider>
  );
};

export default UsersDataContext;