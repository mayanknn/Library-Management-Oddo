import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { app } from '../../firebase';
import { useUsersDataContext } from './UsersData';

const RequestPendingDataContext = createContext();

export const useRequestPendingDataContext = () => useContext(RequestPendingDataContext);

export const RequestPendingDataProvider = ({ children }) => {
  const [requestData, setRequestData] = useState([]);
  const db = getFirestore(app);
  const { UsersData } = useUsersDataContext();

  useEffect(() => {
    const fetchIssueData = async () => {
      try {
        const issuetake = collection(db, "issue");
        const q = query(issuetake, where('IssueRequest', '==', false));
        const querySnapshot1 = await getDocs(q);
        console.log(q,querySnapshot1)
        const issuePromises = querySnapshot1.docs.map(async (issueDoc) => {
          const issueData = issueDoc.data();
          const userId = issueData.userId; // Assuming the issue document contains a userId field
          const bookId = issueData.bookId; // Assuming the issue document contains a bookId field

          // Fetch the user document
          const userDocRef = collection(db, 'users');
          const userQuery = query(userDocRef, where('uid', '==', userId)); // Corrected the operator to '=='
          const userQuerySnapshot = await getDocs(userQuery);
          console.log("Mayank",userQuerySnapshot.docs[0].data().Name) // Use getDocs to fetch the query snapshot

          const userData = userQuerySnapshot.empty ? {} : userQuerySnapshot.docs[0].data().Name; // Get the first document's data
          // Fetch the book document
        //   const bookDocRef = collection(db, 'bookdata');
        //   const bookQuery = query(bookDocRef, where('bookId', '==', bookId));
        //   const bookQuerySnapshot = await getDocs(bookQuery);
        //   console.log(bookQuerySnapshot);
        //   console.log("Books",bookQuerySnapshot.docs[0].data())
        //   const bookData = bookQuerySnapshot.empty ? {} : bookQuerySnapshot.docs[0].data().Title;
          const bookDocRef = doc(db, 'bookdata', bookId); // Fetch the book by ID directly
          const bookDoc = await getDoc(bookDocRef);
          const bookTitle = bookDoc.exists() ? bookDoc.data().Title : 'Unknown'; // Fetch book title
          const bookImg = bookDoc.exists() ? bookDoc.data().bookimg : 'Unknown'; // Fetch book title

          return {
            ...issueData,
            userName: userData || 'Unknown', // Default value if name is not found
            bookName: bookTitle || 'Unknown',
            bookimg:bookImg // Default value if title is not found
          };
        });

        const data = await Promise.all(issuePromises);
        console.log('issuee :: ',data);
        setRequestData(data);
        
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchIssueData();
  }, [db]);

  return (
    <RequestPendingDataContext.Provider value={{ requestData, setRequestData }}>
      {children}
    </RequestPendingDataContext.Provider>
  );
};

export default useRequestPendingDataContext;
