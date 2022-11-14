import './App.css';
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux';


import Counter from './components/counter';
import Login from './pages/auth';
import ChatScreen from './pages/chat';

function App() {
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
