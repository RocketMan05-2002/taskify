import React, { useContext, useState } from 'react';
import { ClipContext } from '../../context/ClipContext';

const Card = ({ clipHeading, clipDescription = "Complete this todo asap", clipId, onDelete}) => {
  const [status, setStatus] = useState("start");

  const { updateAClip, deleteAClip } = useContext(ClipContext);

  const handleToggle = (newStatus) => {
    if (status === 'start' || status !== newStatus) {
      setStatus(newStatus);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4 w-[300px] bg-gray-800 border border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-105 cursor-pointer">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold text-gray-200">{clipHeading}</h1>
        <span className={`px-2 py-1 rounded-md text-sm font-medium 
          ${status === "start" ? "bg-gray-700 text-gray-300" : status === "pending" ? "bg-yellow-500 text-black" : "bg-green-500 text-black"}`}>
          {status === "start" ? "Start" : status === "pending" ? "Pending" : "Done"}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm">{clipDescription}</p>

      {/* Toggle Slab */}
      <div className="flex justify-between items-center gap-2 mt-2">
        <div className="flex bg-gray-700 rounded-full overflow-hidden border border-gray-600">
          <button
            className={`cursor-pointer px-4 py-1 transition-all duration-200 font-medium 
              ${status === 'done' ? 'bg-green-500 text-black' : 'text-gray-300'}`}
            onClick={async()=>{
              await updateAClip(clipId,"DONE");
              handleToggle('DONE');
            }}
          >
            Done
          </button>
          <button
            className={`cursor-pointer px-4 py-1 transition-all duration-200 font-medium 
              ${status === 'pending' ? 'bg-yellow-500 text-black' : 'text-gray-300'}`}
            onClick={async () => {
              await updateAClip(clipId,"PENDING");
              handleToggle('PENDING');
            }}
          >
            Pending
          </button>
        </div>

        <button 
  onClick={() => {
    deleteAClip(clipId).then(() => {
      if (onDelete) onDelete();  // refresh list after delete
    });
  }}
  className="cursor-pointer px-3 py-1 bg-red-600 text-white font-medium rounded-md border border-red-500 hover:bg-red-700 transition-colors duration-200"
>
  Delete
</button>
      </div>
    </div>
  );
};

export default Card;