import React from 'react'

const Card = ({ clipHeading, clipDescription = "Complete this todo asap", status = false}) => {
  return (
    <div className='flex flex-col gap-4 bg-indigo-700 border-2 p-2 border-gray-950 w-[300px] hover:scale-102 cursor-pointer hover:bg-indigo-600'>
        <div className='flex justify-between items-center'>
            <h1>{clipHeading}</h1>
            <h1 className='bg-red-900 border-1 p-1 border-gray-950 rounded-xl'>{status === true?"Completed":"Pending"}</h1>
        </div>
        <div className="bottom">
            <h1>{clipDescription}</h1>
        </div>
        <div className='flex flex-start gap-2 items-center'>
          <button className='bg-red-900 border-1 p-1 border-gray-950 rounded-xl'>Delete</button>
          <button className='bg-red-900 border-1 p-1 border-gray-950 rounded-xl'>Mark as Done</button>
        </div>
    </div>
  )
}

export default Card
