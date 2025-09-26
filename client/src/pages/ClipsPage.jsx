import React, { use, useContext, useEffect, useState, useRef } from "react";
import Card from "../components/Card";
import { ClipContext } from "../../context/ClipContext";
import { AuthContext } from "../../context/AuthContext";

const ClipsPage = () => {
  const { getClipsForAUser, clips, addClip } = useContext(ClipContext);

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
    await addClip(clipsObject); // wait until API finishes as addClip ke pehle hi getClips horaha
    await getClipsForAUser(currentUser.id); // refresh list after clip add ho gaya
    setClipsObject({
      heading: "",
      description: "",
      status: "START",
      userId: currentUser.id,
    });
    setShowForm(false);
  };

  useEffect(() => {
    console.log(currentUser.id);
    getClipsForAUser(currentUser.id);
  }, [currentUser]);

  //on outside click useEffect
  useEffect(() => {
    function onOutsideClick(e) {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setShowForm(false);
      }
    }
    if (showForm) {
      document.addEventListener("mousedown", onOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", onOutsideClick);
    };
  }, [showForm]);

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      
      <div className="flex justify-between items-center mb-6 p-4 bg-gray-800 border border-gray-700 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-200">
          {currentUser.userName} - tasks
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 h-[40px] w-[120px] bg-gray-800 text-gray-200 border border-gray-600 rounded-xl font-medium hover:bg-green-600 hover:text-black transition-all duration-200 cursor-pointer"
        >
          Add work
        </button>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
        {clips.map((clip) => (
          <Card
            key={clip.id}
            clipHeading={clip.heading}
            clipDescription={clip.description}
            clipId={clip.id}
            onDelete={() => getClipsForAUser(currentUser.id)}
          />
        ))}
      </div>
      {showForm === true && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex justify-center items-center z-50">
          <form
            ref={formRef}
            onSubmit={handleFromSubmit}
            className="flex flex-col gap-4 p-6 bg-white text-black rounded-lg shadow-lg w-[400px]"
          >
            <h2 className="text-xl font-bold mb-2">Add New Clip</h2>
            <input
              type="text"
              value={clipsObject.heading}
              onChange={(e) =>
                setClipsObject({ ...clipsObject, heading: e.target.value })
              }
              placeholder="Enter heading"
              name="heading"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={clipsObject.description}
              onChange={(e) =>
                setClipsObject({ ...clipsObject, description: e.target.value })
              }
              placeholder="Enter description"
              name="description"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Add Clip
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ClipsPage;
