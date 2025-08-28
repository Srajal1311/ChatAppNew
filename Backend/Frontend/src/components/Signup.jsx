import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
export default function Signup() {
  const [authUser,setAuthUser]=useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
// watch the password  and confirm password fields
  const password = watch("password", "");

  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };

  const onSubmit =async (data) => {
    const userInfo={
        fullname: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword

    }
    //console.log(userInfo);
    await axios
    .post("/api/user/signup", userInfo)
    .then((response) => {
        
        if(response.data){
        toast.success("Signup successful");
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
    <div className='flex h-screen items-center justify-center'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='border border-white px-6 py-2 rounded-md space-y-3 w-96'
      >
        <h1 className='text-2xl text-center'>
          Chat <span className='text-green-500 font-semibold '>App</span>
        </h1>
        <h2 className='text-xl font-semibold'>Signup</h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: true, minLength: 3 })}
          className="w-full border p-2 rounded"
        />
        {errors.username && (
          <p className="text-red-500 font-semibold">Username is required</p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
          className="w-full border p-2 rounded"
        />
        {errors.email && (
          <p className="text-red-500 font-semibold">Email is required</p>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
            minLength: 8,
            pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
          })}
          className="w-full border p-2 rounded"
        />
        {errors.password && (
          <p className="text-red-500 font-semibold">
            Password must be at least 8 characters and contain 1 uppercase, 1 lowercase, and 1 number
          </p>
        )}

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Confirm your password",
            validate: validatePasswordMatch,
          })}
          className="w-full border p-2 rounded"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 font-semibold">
            {errors.confirmPassword.message}
          </p>
        )}
        {/* Text & Button */}
        <div className='flex justify-between items-center mt-4'>
          <p>
            Have an account?{" "}
            <Link to="/login" className='text-blue-500 font-semibold underline cursor-pointer'>
              Login
            </Link>
          </p>
          <input
            type="submit"
            value="Signup"
            className='bg-green-600 text-white rounded-md px-2 py-1 cursor-pointer hover:bg-green-500 font-semibold duration-200'
          />
        </div>
      </form>
    </div>
  );
}
