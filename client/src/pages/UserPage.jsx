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

  const randomUtility = (length) => {
    return Math.floor(Math.random() * length);
  };

  const randomPassWord = () => {
    const charSet = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let password = "";
    for (let i = 0; i < 9; i++) {
      password += charSet[randomUtility(charSet.length)];
    }
    setUserObject({ ...userObject, password: password });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await addUser(userObject); // call your context function
    setUserObject({ userName: "", password: "", clips: [] }); // reset form
    setShowForm(false); // close modal
  };

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
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-200">ClipBoard.online</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 h-[40px] w-[120px] bg-gray-800 text-gray-200 border border-gray-600 rounded-xl font-medium hover:bg-green-600 hover:text-black transition-all duration-200 cursor-pointer"
          >
            Add Topic
          </button>
          <button className="px-4 py-2 h-[40px] w-[120px] bg-gray-800 text-gray-200 border border-gray-600 rounded-xl font-medium hover:bg-green-600 hover:text-black transition-all duration-200 cursor-pointer">
            Sign in
          </button>
        </div>
      </div>

      {/* Users List */}
      <div className="flex flex-col gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between bg-gray-800/40 backdrop-blur-md border border-gray-700 rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <UserSlab userName={user.userName} />

            <div className="flex gap-3">
              <button
                onClick={() => handleMigrationToClipsPage(user)}
                className="px-4 py-2 rounded-xl bg-gray-700 text-gray-200 border border-gray-600 hover:bg-green-500 hover:text-black transition-all duration-200 cursor-pointer"
              >
                Open Tasks
              </button>
              <button className="px-4 py-2 rounded-xl bg-gray-700 text-gray-200 border border-gray-600 hover:bg-yellow-500 hover:text-black transition-all duration-200 cursor-pointer">
                Edit User
              </button>
            </div>
          </div>
        ))}
      </div>
      {
  showForm && (
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <form
        ref={formRef}
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-4 p-6 bg-white text-black rounded-lg shadow-lg w-[400px]"
      >
        <h2 className="text-xl font-bold mb-2">Add New User</h2>
        <input
          type="text"
          placeholder="Enter username"
          value={userObject.userName}
          onChange={(e) =>
            setUserObject({ ...userObject, userName: e.target.value })
          }
          name="userName"
          className="w-full p-2 border border-gray-300 rounded-md"
        />

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={randomPassWord}
            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
          >
            Generate random password
          </button>
          <h1 className="text-sm text-gray-700">Password : {userObject.password}</h1>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Add Topic
        </button>
      </form>
    </div>
  )
}
    </div>
  );
};

export default UserPage;
