import React, { useContext, useEffect, useState } from "react";
import { ClipContext } from "../../context/ClipContext";

const Card = ({
  clipHeading,
  clipDescription = "Complete this todo asap",
  clipId,
  onDelete,
  status,
}) => {
  const { updateAClip, deleteAClip } = useContext(ClipContext);

  const [localStatus, setLocalStatus] = useState(status);

  useEffect(() => {
    setLocalStatus(status);
  }, [status]);

  const handleStatusChange = async (newStatus) => {
    if (newStatus !== localStatus) {
      await updateAClip(clipId, newStatus);
      setLocalStatus(newStatus);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-5 w-[320px] bg-white/10 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-200 hover:scale-[1.03] cursor-pointer">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold bg-gradient-to-r from-green-300 to-blue-400 bg-clip-text text-transparent">
          {clipHeading}
        </h1>
        <span
          className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide shadow-md
            ${
              localStatus === "START"
                ? "bg-gray-700 text-gray-300"
                : localStatus === "PENDING"
                ? "bg-yellow-400 text-black"
                : "bg-green-400 text-black"
            }`}
        >
          {localStatus === "START"
            ? "Start"
            : localStatus === "PENDING"
            ? "Pending"
            : "Done"}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm leading-relaxed">
        {clipDescription}
      </p>

      {/* Controls */}
      <div className="flex justify-between items-center mt-2">
        {/* Status Buttons */}
        <div className="flex bg-gray-800/50 rounded-full overflow-hidden border border-gray-600 shadow-inner">
          <button
            className={`px-4 py-1 text-sm font-medium transition-all duration-200 
              ${
                localStatus === "DONE"
                  ? "bg-green-400 text-black"
                  : "text-gray-300 hover:bg-green-500/20"
              }`}
            onClick={() => handleStatusChange("DONE")}
          >
            Done
          </button>
          <button
            className={`px-4 py-1 text-sm font-medium transition-all duration-200 
              ${
                localStatus === "PENDING"
                  ? "bg-yellow-400 text-black"
                  : "text-gray-300 hover:bg-yellow-400/20"
              }`}
            onClick={() => handleStatusChange("PENDING")}
          >
            Pending
          </button>
        </div>

        {/* Delete */}
        <button
          onClick={() => {
            deleteAClip(clipId).then(() => {
              if (onDelete) onDelete();
            });
          }}
          className="px-3 py-1 text-sm font-medium rounded-lg bg-gradient-to-r from-red-500 to-red-700 text-white shadow-md hover:scale-105 hover:shadow-lg transition-transform"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;