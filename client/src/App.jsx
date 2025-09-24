import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Card from './components/Card';

const App = () => {
  const {users} = useContext(AuthContext);
  return (
    <div className='text-white'>
      <div className="bg-red-900">
        <h1 className='p-4 text-3xl '>Clipboard.online</h1>
      </div>
      <div className=" grid grid-cols-4 gap-4 bg-red-500 h-screen p-4 border-2 border-gray-700" >
        {
          users.map((user,ind)=>{
            return <div key={user.id} className='bg-gray-500/30 mr-auto p-3 border-2 border-gray-950 h-[200px]'>
              <Card userName={user.userName} />
            </div>
          })
        }
      </div>
    </div>
  )
}

export default App
