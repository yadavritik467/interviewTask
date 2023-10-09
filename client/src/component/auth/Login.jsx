import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contextApi/auth';

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const[auth,setAuth] = useAuth()

    const navigate = useNavigate();
    const login = async(e) =>{

        try {
            e.preventDefault();
            const {data} =  await axios.post("http://localhost:4500/api/v1/login",{
                email,password
            })
            if(data){
                toast.success(data.message);
                setAuth({
                    ...auth,
                    user:data.user,
                    token:data.token,
                  
                  });
                  localStorage.setItem("userID", JSON.stringify(data));
                //   console.log(data)
                navigate("/ProfileCreator")
            }

            
        } catch (error) {
            toast.error(error.response.data.message)
            setTimeout(()=>{
                navigate("/register")
            },1500)
        }
    }
  return (
    <div className='auth'>
        
        <form action="" onSubmit={login}>
            <h1> Login page</h1>
            <input type="email"   value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder='Enter your email' />
            <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your password' />
            {/* <p className="error">error</p> */}
            <button type='submit'>Login</button>
            <p>Don't have account ? <Link to={"/register"} >Register now</Link></p>
        </form>
    </div>
  )
}

export default Login
