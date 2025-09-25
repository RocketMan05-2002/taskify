import React from 'react'

const UserSlab = ({userName, noOfPendingTasks = 5}) =>{
    return(
        <div className='bg-indigo-700 border-2 border-gray-950 w-[80%] flex justify-between
        items-center px-4 py-3 shadow-orange-300 rounded-2xl  hover:scale-102 cursor-pointer hover:bg-indigo-600'>
            <h1>{userName}</h1>
            <span className='bg-yellow-400 rounded-full text-black p-1 flex justify-center items-center'>
                {noOfPendingTasks}
                </span>
        </div>
    )
}

export default UserSlab