import React from 'react';
import axios from 'axios';
import { useForm} from "react-hook-form";
import { useAuth} from "../context/AuthProvider.jsx"
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Login() {
    const [authUser,setAuthUser]=useAuth();
    const {
        register,
        handleSubmit,
        
        formState: { errors },
      } = useForm();
    const onSubmit = async (data) => {
    const userInfo={
        
        email: data.email,
        password: data.password,
        

    }
        //console.log(userInfo);
    await axios
    .post("/api/user/login", userInfo,{
      withCredentials:true
    })
    .then((response) => {
        
        if(response.data){
        toast.success("Login successful");
        }
        localStorage.setItem("ChatApp",JSON.stringify(response.data));
        setAuthUser(response.data);
    })
    .catch((error) => {
        if(error.response){
            toast.error("Error: "+error.response.data.error)
        }

    })
};
  return (
    <>
    <div className='flex h-screen  items-center justify-center'>
        <form onSubmit={handleSubmit(onSubmit)} className='border border-white px-6 py-2 rounded-md space-y-3 w-96'>
            <h1 className='text-2xl text-center'>Chat <span className='text-green-500 font-semibold'>App</span></h1>
            <h2 className='text-xl font-semibold'>Login</h2>
            
        {/* Email */}
        <label className="input validator">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </g>
  </svg>
  <input type="email" placeholder="Email"  {...register("email", { required: true })} />
</label>
    {errors.email && (
          <p className="text-red-500 font-semibold">Email is required</p>
        )}
<div className="validator-hint hidden">Enter valid email address</div>
        {/* password */}
        <label className="input validator">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
      ></path>
      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
    </g>
  </svg>
  <input
  type="password"
  required
  placeholder="Password"
  autoComplete="current-password"
  {...register("password", {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
    pattern: {
      value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
      message: "Must include uppercase, lowercase, and number",
    },
  })}
/>
</label>
{errors.password && (
          <p className="text-red-500 font-semibold">
            Password must be at least 8 characters and contain 1 uppercase, 1 lowercase, and 1 number
          </p>
        )}
<p className="validator-hint hidden">
  Must be more than 8 characters, including
  <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
</p>
        
        {/* Text & Button */}
        <div className='flex justify-between'>
            <p>New user?<Link to="/Signup" className='text-blue-500 underline cursor-pointer ml-2'>Signup</Link></p>
            <input type="submit" value="Login" className='bg-green-600 text-white rounded-md px-2 py-1 ml-2 mr-1 cursor-pointer hover:bg-green-500 duration-200'></input>
        </div>
        </form>
    </div>
    </>
  )
}