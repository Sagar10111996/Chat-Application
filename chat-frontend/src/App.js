import './App.css';
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux';


import Counter from './components/counter';
import Login from './pages/auth';

function App() {
  const isUserLoggedIn = useSelector(state => state.user.isUserLoggedIn)
  return (
    <div className="App">
      <Routes>
        <Route path='/chat' element={isUserLoggedIn ? <Counter /> : <Login />} />
        <Route path='/' element={ isUserLoggedIn ? <Counter /> : <Login />} />
      </Routes>
    </div>
  );
}

export default App;
