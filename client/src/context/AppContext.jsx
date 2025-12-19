import {  createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
// import { Navigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;



const AppContext = createContext()

export const AppContextProvider = ({children}) => {

    // const navigate = useNavigate()
    // const navigate = Navigate()
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([])
    const [selectedChat, setSelectedChat] = useState(null)
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [token, setToken] = useState(localStorage.getItem('token') || null)
    const [loadingUser, setLoadingUser] = useState(true)

    const fetchUser = async () => {
        try {
         const {data} =  await axios.get('/api/user/data',{headers: {Authorization: token}})


         if(data.success){
            setUser(data.user)
         }
        } catch (error) {
            // Ignore 401 Unauthorized (normal during login init)
            if (error.response?.status !== 401) {
                toast.error(error.message);
            }
            setUser(null);
            }finally{
            setLoadingUser(false)
        }
    }
    const createNewChat = async() => {
        try {
            if(!user){
                return toast('login to create a new chat')
            }
            
            await axios.get('/api/chat/create', {headers: {Authorization: token}})
            await fetchUserChats()
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchUserChats = async () => {
        try {
            const{data} = await axios.get('/api/chat/get', {headers: {Authorization: token}})
            if(data.success){
                setChats(data.chats)
                //if the user has no chata, create one
                if(data.chats.length === 0){
                    await createNewChat();
                    return fetchUserChats()
                }else{
                    setSelectedChat(data.chats[0])
                }
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if(user){
            fetchUserChats()
        }else{
            setChats([])
            setSelectedChat(null)
        }
    },[user])

    useEffect(() => {
        if(token){
             fetchUser()
        }else{
            setUser(null)
            setLoadingUser(false)
        }
       
    },[token]);

    useEffect(()=>{
        if(theme === 'dark'){
           document.documentElement.classList.add('dark') ;

        }else{
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme)
    },[theme]
)

    const value = {
        user,setChats,setUser,chats,fetchUser,
        selectedChat,setSelectedChat,theme,setTheme,createNewChat,loadingUser,fetchUserChats, token, setToken, axios
    }

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=> useContext(AppContext)