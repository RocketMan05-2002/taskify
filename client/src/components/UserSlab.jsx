import React from 'react';

const UserSlab = ({ userName, noOfPendingTasks = 3 }) => {
  return (
    <div className="flex justify-between items-center w-[80%] px-4 py-3 bg-gray-800/40 backdrop-blur-md border border-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-101 cursor-pointer">
      <h1 className="text-gray-200 font-medium text-lg">{userName}</h1>
      <span className="flex justify-center items-center w-6 h-6 rounded-full bg-yellow-300 text-black font-semibold">
        {noOfPendingTasks}
      </span>
    </div>
  );
};

export default UserSlab;