import './App.css';
import { Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react'
import jwt_decode from "jwt-decode";

import Login from './pages/auth';
import ChatScreen from './pages/chat';
import { Constants } from './constants/api';
import { setLoggedInUserDetails, setLoginStatus } from './redux/slice/user'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    let accessToken = localStorage.getItem(Constants.STORAGE_ITEM_ACCESS_TOKEN)
    if (accessToken) {
      let decoded = jwt_decode(accessToken);
      dispatch(setLoggedInUserDetails({id: decoded.user_id, email: decoded.email, first_name: decoded.first_name, last_name: decoded.last_name}))
      dispatch(setLoginStatus(true))
    }
  })

  const isUserLoggedIn = useSelector(state => state.user.isUserLoggedIn)
  return (
    <div className="App">
      <Routes>
        {/* <Route path='/chat' element={isUserLoggedIn ? <Counter /> : <Login />} /> */}
        <Route path='/' element={ isUserLoggedIn ? <ChatScreen /> : <Login />} />
      </Routes>
    </div>
  );
}

export default App;
