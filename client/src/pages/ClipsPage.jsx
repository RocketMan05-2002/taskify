import React, { useContext, useEffect, useState, useRef } from "react";
import Card from "../components/Card";
import { ClipContext } from "../../context/ClipContext";
import { AuthContext } from "../../context/AuthContext";

const ClipsPage = () => {
  const { getClipsForAUser, clips, addClip, setClips } = useContext(ClipContext);
  const { currentUser } = useContext(AuthContext);

  const [clipsObject, setClipsObject] = useState({
    heading: "",
    description: "",
    status: "START",
    userId: currentUser.id,
  });

  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);

  const handleFromSubmit = async (e) => {
    e.preventDefault();
    await addClip(clipsObject);
    await getClipsForAUser(currentUser.id);
    setClipsObject({
      heading: "",
      description: "",
      status: "START",
      userId: currentUser.id,
    });
    setShowForm(false);
  };

  useEffect(() => {
    getClipsForAUser(currentUser.id);
    return () => {
      setClips([]); // clear old data when switching user
    };
  }, [currentUser]);

  // outside click
  useEffect(() => {
    function onOutsideClick(e) {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setShowForm(false);
      }
    }
    if (showForm) document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, [showForm]);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 p-6 bg-white/10 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-green-300 to-blue-400 bg-clip-text text-transparent drop-shadow">
          {currentUser.userName}’s Tasks
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-5 py-2 h-[44px] w-[140px] bg-gradient-to-r from-green-400 to-emerald-600 text-black font-semibold rounded-xl shadow-md hover:scale-105 hover:shadow-xl transition-all duration-200"
        >
          + Add Task
        </button>
      </div>

      {/* Clips Grid */}
      {clips.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-400 mt-20">
          <h2 className="text-xl font-medium">No tasks yet</h2>
          <p className="text-sm">Click “+ Add Task” to create your first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {clips.map((clip) => (
            <Card
              key={clip.id}
              clipHeading={clip.heading}
              clipDescription={clip.description}
              clipId={clip.id}
              onDelete={() => getClipsForAUser(currentUser.id)}
              status={clip.status}
            />
          ))}
        </div>
      )}

      {/* Add Clip Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <form
            ref={formRef}
            onSubmit={handleFromSubmit}
            className="flex flex-col gap-5 p-8 bg-white/95 text-black rounded-2xl shadow-2xl w-[420px] animate-fadeIn"
          >
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Add New Task
            </h2>
            <input
              type="text"
              value={clipsObject.heading}
              onChange={(e) =>
                setClipsObject({ ...clipsObject, heading: e.target.value })
              }
              placeholder="Enter task title"
              name="heading"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />
            <textarea
              value={clipsObject.description}
              onChange={(e) =>
                setClipsObject({ ...clipsObject, description: e.target.value })
              }
              placeholder="Enter task description"
              name="description"
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none resize-none"
            />
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-green-400 to-emerald-600 text-black font-semibold rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-200"
            >
              Add Task
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ClipsPage;