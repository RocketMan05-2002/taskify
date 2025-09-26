import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  // Load currentUser from localStorage if it exists
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  // agar hum simple state use karein toh refresh par our value of userId will be lost

  const getUsers = async () => {
    try {
      const { data } = await axios.get("/todo/getAllUsers");
      setUsers(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const addUser = async (user) => {
    try {
      const { data } = await axios.post("/todo/addUser", user);
      setUsers([...users, data]);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Keep localStorage in sync with currentUser
  // jab bhi currentUser change ho, we'll have to update localStorage accordingly
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const value = {
    users,
    getUsers,
    addUser,
    setCurrentUser,
    currentUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
