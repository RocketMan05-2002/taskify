import React from "react";

const UserSlab = ({ userName, noOfPendingTasks = 3 }) => {
  return (
    <div className="flex justify-between items-center w-full px-5 py-4 bg-white/10 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 cursor-pointer">
      {/* User Name */}
      <h1 className="text-lg font-semibold bg-gradient-to-r from-green-300 to-blue-400 bg-clip-text text-transparent drop-shadow">
        {userName}
      </h1>

      {/* Pending Tasks Badge */}
      <span className="flex justify-center items-center w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold shadow-md">
        {noOfPendingTasks}
      </span>
    </div>
  );
};

export default UserSlab;