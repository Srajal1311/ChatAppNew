import React from 'react';
import Left from './assets/home/Leftpart/Left'
import Right from './assets/home/Rightpart/Right'
import Login from './components/Login';
import Signup from './components/Signup'
import { useAuth } from './context/AuthProvider';
import {Route,Routes} from "react-router-dom";
import { Navigate } from 'react-router-dom';
import Loading from './components/Loading';
import toast, {Toaster} from "react-hot-toast";



function App() {
  const [authUser,setAuthUser]=useAuth();
    console.log(authUser);
 return (
    

    
  <>
  <Routes>
    <Route path="/"element={
      authUser ? (
        <div className="flex h-screen">
          <Left />
          <Right />
        </div>
      ) : (
        <Navigate to={"/login"}/>
      )
    }
  />  
  <Route path="/login" element={authUser?<Navigate to={"/"}/>:<Login/>}/>
  <Route path="/signup" element={authUser? <Navigate to="/"/>:<Signup/>}/>
    </Routes>
    <Toaster />
  </>
  
 
  );
}

export default App;