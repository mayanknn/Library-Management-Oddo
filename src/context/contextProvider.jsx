// AppProviders.js
import React from 'react';
import { ShowPopupProvider } from './showPopup';
import { UserDataProvider } from './userData';
import { DataProvider } from './firebaseData/BookData';
import { UpdateDataProvider } from './updateData';
import { ReqPopupProvider } from './popup2'; // Ensure this is imported
// import { RequestPendingDataProvider } from './firebaseData/requestPendingData';
import { RequestPendingDataProvider } from './firebaseData/requestPendingData'; // Ensure this path is correct
import { UsersDataProvider } from './firebaseData/UsersData';
const AppProviders = ({ children }) => {
  return (
    <UserDataProvider>
      <DataProvider>
      <UsersDataProvider>
      <UpdateDataProvider>
        
          <RequestPendingDataProvider>
            <ShowPopupProvider>
              <ReqPopupProvider> 
                {children}
              </ReqPopupProvider> 
            </ShowPopupProvider>
          </RequestPendingDataProvider>
        
      </UpdateDataProvider>
      </UsersDataProvider>
      </DataProvider>
    </UserDataProvider>
  );
};

export default AppProviders;
