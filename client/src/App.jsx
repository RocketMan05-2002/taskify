import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Card from './components/Card';
import UserPage from './pages/UserPage';
import ClipsPage from './pages/ClipsPage'
import { Route, Routes } from 'react-router';

const App = () => {
  // const {users} = useContext(AuthContext);
  return (
    <div>
      <Routes>
        <Route path='/' element={<UserPage />} />
        <Route path='/clips' element={<ClipsPage/>} />
      </Routes>
    </div>
  )
}

export default App
