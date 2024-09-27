import React, { createContext, useContext, useState } from 'react';

const ShowPopupContext = createContext();

const useShowPopupContext = () => {
  return useContext(ShowPopupContext);
};

const ShowPopupProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  return (
    <ShowPopupContext.Provider value={{ show, setShow }}>
      {children}
    </ShowPopupContext.Provider>
  );
};

export { useShowPopupContext, ShowPopupProvider };
