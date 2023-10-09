import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const [auth,setAuth] = useState({
        user:null,
        token:""
    })

    console.log(auth,)

    useEffect(()=>{
        
        const data = localStorage.getItem("userID");;
        if(data){
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user:parseData.user,
                // token:parseData.token,
            })
        }
    },[])


    return (
        <React.StrictMode>
            <AuthContext.Provider value={[auth,setAuth]}>
                {children}
            </AuthContext.Provider>
        </React.StrictMode>
    );
};

const useAuth = () => useContext(AuthContext);

export {useAuth,AuthProvider}; 