import React, { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import UserSlab from "../components/UserSlab";
import { useNavigate } from "react-router";

const UserPage = () => {
  const { users, getUsers, setCurrentUser, addUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const formRef = useRef(null);

  const [userObject, setUserObject] = useState({
    userName: "",
    password: "",
    clips: [],
  });

  const handleMigrationToClipsPage = (currentUser) => {
    setCurrentUser(currentUser);
    navigate("/clips");
  };

  const randomUtility = (length) => Math.floor(Math.random() * length);

  const randomPassWord = () => {
    const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < 9; i++) {
      password += charSet[randomUtility(charSet.length)];
    }
    setUserObject({ ...userObject, password });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await addUser(userObject);
    setUserObject({ userName: "", password: "", clips: [] });
    setShowForm(false);
  };

  // Close modal when clicking outside
  useEffect(() => {
    function onOutsideClick(e) {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setShowForm(false);
      }
    }
    if (showForm) {
      document.addEventListener("mousedown", onOutsideClick);
    }
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, [showForm]);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
          ClipBoard<span className="text-white">.online</span>
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-2 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-black font-semibold shadow-lg hover:scale-105 transform transition-all duration-200"
          >
            + Add topic
          </button>
          <button className="px-6 py-2 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transform transition-all duration-200">
            Sign in
          </button>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-5 rounded-2xl bg-gray-800/70 backdrop-blur-lg border border-gray-700 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 flex flex-col gap-4"
          >
            <UserSlab userName={user.userName} />

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => handleMigrationToClipsPage(user)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-400 to-green-600 text-black font-medium hover:scale-105 transition-transform duration-200"
              >
                Open Tasks
              </button>
              <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-medium hover:scale-105 transition-transform duration-200">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add User Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
          <form
            ref={formRef}
            onSubmit={handleFormSubmit}
            className="flex flex-col gap-6 p-8 bg-white/10 backdrop-blur-md border border-gray-600 text-white rounded-2xl shadow-2xl w-[400px] animate-slideUp"
          >
            <h2 className="text-2xl font-bold text-center">Add New User</h2>
            <input
              type="text"
              placeholder="Enter username"
              value={userObject.userName}
              onChange={(e) =>
                setUserObject({ ...userObject, userName: e.target.value })
              }
              name="userName"
              className="w-full p-3 rounded-lg bg-gray-900/70 border border-gray-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={randomPassWord}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-medium hover:scale-105 transition-all duration-200"
              >
                Generate Random Password
              </button>
              <p className="text-sm text-gray-300">
                Password:{" "}
                <span className="font-mono text-green-400">
                  {userObject.password}
                </span>
              </p>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold hover:scale-105 transition-all duration-200"
            >
              Add User
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserPage;