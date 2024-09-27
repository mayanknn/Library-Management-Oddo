import './App.css'
import SignUp from './SignUP'
import ForgotPage from './ForgotPage'
import MainPage from './MainPage'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './components/Main'
import UserPanel from './components/UserPanel';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot" element={<ForgotPage />} />
          <Route path="/main" element={<Main />} />
          {/* <Route path="/user" element={<UserPanel />} /> */}
      </Routes>
    </BrowserRouter>
    </div> 
  )
}

export default App
