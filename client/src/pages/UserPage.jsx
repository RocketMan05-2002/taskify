import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Card from '../components/Card';
import UserSlab from '../components/UserSlab';
import { useNavigate } from "react-router";

const UserPage = () => {
  const {users} = useContext(AuthContext);
  // const { setCurrentUser} = useContext(AuthContext);

  const navigate = useNavigate();

  const handleMigrationToClipsPage = (currentUserId) =>{
    // setCurrentUser(currentUserId);
    navigate('/clips');
  }

  return (
    <div className='text-white'>
      <div className="bg-amber-950 flex justify-between px-3 items-center">
        <h1 className='p-4 text-3xl text-amber-200'>ClipBoard.online</h1>
        <button className='bg-amber-200 p-2 h-[40px] flex items-center justify-center border-2 border-amber-600 text-amber-950 font-medium hover:scale-105 hover:bg-amber-600 cursor-pointer'>Sign in</button>
      </div>
      <div className="flex flex-col bg-amber-200 gap-3 h-screen p-4 border-2 border-gray-700" >
        {
          users.map((user,ind)=>{
            return <div key={user.id} className='flex items-center justify-around bg-gray-500/30 mr-auto p-3 border-2 border-gray-950 h-[100px] w-full'>
              <UserSlab userName={user.userName} />
              <button onClick={()=>handleMigrationToClipsPage(user.id)}  className='bg-indigo-700 p-2 h-[40px] border-2 border-gray-950 hover:scale-110 hover:bg-indigo-400 cursor-pointer'>Open Clips</button>
              <button className ='bg-yellow-700 p-2 h-[40px] border-2 border-gray-950 hover:scale-110 cursor-pointer'>Edit User</button>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default UserPage
