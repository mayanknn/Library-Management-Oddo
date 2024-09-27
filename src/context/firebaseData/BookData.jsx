import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { app } from '../../firebase';

const DataContext = createContext();

export const useBookDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [bookData, setBookData] = useState([]);
  const [search ,setSearch] = useState('');
  const db = getFirestore(app);

  useEffect(() => {
    // Function to set up Firestore listener
    const setupListener = () => {
      const refe = collection(db, 'bookdata');
      const unsubscribe = onSnapshot(refe, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        if (data.length > 0) {
          console.log('Updated Data:', data);
        } else {
          console.log('No data available');
        }
        if(search!==''){
          console.log(search)
          const data = data.filter((book) => 
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) )
        }
        
        setBookData(data);
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
    <DataContext.Provider value={{ bookData, setBookData,search ,setSearch}}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;