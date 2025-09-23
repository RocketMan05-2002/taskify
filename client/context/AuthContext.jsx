import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast"

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [users, setUsers] = useState([]);

    const getUsers = async()=>{
        try{
            const {data} = await axios.get("/todo/getAllUsers");
            setUsers(data);
        }catch(err){
            toast.error(err.message);
        }
    }

    const addUser = async()=>{
        try{
            const  {newUser} = await axios.post("/todo/addUser",credentials);
            setUsers([...users, newUser]);
        }catch(err){
            toast.error(err.message);
        }
    }

    useEffect(()=>{
        getUsers();
    },[]);

    const value = {
        users,
        addUser,
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}