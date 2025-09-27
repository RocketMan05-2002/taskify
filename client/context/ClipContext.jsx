import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast"

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const ClipContext = createContext();

export const ClipProvider = ({children}) =>{

    const [clips, setClips] = useState([]);

    // get clips for a particular user
    const getClipsForAUser = async(userId)=>{
        try{
            const { data } = await axios.get(`/todo/getAllClips/${userId}`);
            if(data.length !== 0){
                setClips(data);
            }
        }catch(err){
            toast.error(err.message);
        }
    }

    // delete a clip
    const deleteAClip = async(clipId)=>{
        try{
            const response = await axios.delete(`/todo/delete/clip/${clipId}`);
            // update state immediately
            setClips(prev => prev.filter(c => c.id !== clipId));
            toast.success(response.message);
        }catch(err){
            toast.error(err.message);
        }
    }
    
    // update a clip
    const updateAClip = async(clipId, status)=>{
        try{
            // "http://localhost:8080/todo/update/clip/123?status=ACTIVE"
            const response = await axios.put(`/todo/update/clip/${clipId}?status=${status}`);
            toast.success(response.message);
        }catch(err){
            toast.error(err.message);
        }
    }

    // add a clip for a particular user
    const addClip = async(clipObject)=>{
        try{
            // clipObject.userId , 
            const { data } = await axios.post(`/todo/addClip`, clipObject);
            toast.success("Clip added successfully");
        }catch(err){
            toast.error(err.message);
        }
    }

    const value = {
        clips,
        setClips,
        getClipsForAUser,
        deleteAClip,
        updateAClip,
        addClip
    }

    return (
        <ClipContext.Provider value={value}>
            {children}
        </ClipContext.Provider>
    )
}