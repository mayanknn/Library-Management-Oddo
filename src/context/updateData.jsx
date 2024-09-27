import React, { createContext, useContext, useState } from 'react';

const UpdateDataContext = createContext();

export const UpdateDataProvider = ({ children }) => {
  const [dataObj, setDataObj] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <UpdateDataContext.Provider value={{ dataObj, setDataObj, showProfile,setShowProfile }}>
      {children}
    </UpdateDataContext.Provider>
  );
};

export const useUpdateDataContext = () => useContext(UpdateDataContext);
