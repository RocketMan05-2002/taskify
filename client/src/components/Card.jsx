import React from 'react'

const Card = ({userName, todoText = "Complete this todo task asap", status = false}) => {
  return (
    <div className='flex flex-col gap-4 bg-indigo-700 border-2 p-2 border-gray-950 w-[300px]'>
        <div className='flex justify-between items-center'>
            <h1>{userName}</h1>
            <h1 className='bg-red-900 border-1 p-1 border-gray-950 rounded-xl'>{status === true?"Completed":"Pending"}</h1>
        </div>
        <div className="bottom">
            <h1>{todoText}</h1>
        </div>
    </div>
  )
}

export default Card
