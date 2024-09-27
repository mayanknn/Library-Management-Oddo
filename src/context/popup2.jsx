import React, { createContext, useContext, useState } from 'react';

const reqPopupContext = createContext();

const useReqPopupContext = () => {
  return useContext(reqPopupContext);
};

const ReqPopupProvider = ({ children }) => {
  const [reqShow, setReqShow] = useState(false);
  return (
    <reqPopupContext.Provider value={{ reqShow, setReqShow }}>
      {children}
    </reqPopupContext.Provider>
  );
};

export { useReqPopupContext, ReqPopupProvider };
