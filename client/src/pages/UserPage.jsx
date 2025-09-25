import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import UserSlab from '../components/UserSlab';
import { useNavigate } from "react-router";

const UserPage = () => {
  const { users } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleMigrationToClipsPage = (currentUserId) => {
    navigate('/clips');
  };

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-200">ClipBoard.online</h1>
        <button className="px-4 py-2 h-[40px] w-[120px] bg-gray-800 text-gray-200 border border-gray-600 rounded-xl font-medium hover:bg-green-600 hover:text-black transition-all duration-200 cursor-pointer">
          Sign in
        </button>
      </div>

      {/* Users List */}
      <div className="flex flex-col gap-4">
        {users.map((user) => (
          <div 
            key={user.id} 
            className="flex items-center justify-between bg-gray-800/40 backdrop-blur-md border border-gray-700 rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <UserSlab userName={user.userName} />
            
            <div className="flex gap-3">
              <button
                onClick={() => handleMigrationToClipsPage(user.id)}
                className="px-4 py-2 rounded-xl bg-gray-700 text-gray-200 border border-gray-600 hover:bg-green-500 hover:text-black transition-all duration-200 cursor-pointer"
              >
                Open Clips
              </button>
              <button
                className="px-4 py-2 rounded-xl bg-gray-700 text-gray-200 border border-gray-600 hover:bg-yellow-500 hover:text-black transition-all duration-200 cursor-pointer"
              >
                Edit User
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;