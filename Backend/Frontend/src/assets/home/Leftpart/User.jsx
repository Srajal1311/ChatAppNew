import React from 'react'
import Users from './Users'
import useGetAllUsers from '../../../context/useGetAllUsers'
import { all } from 'axios'

function User() {
  const [allUsers,loading]=useGetAllUsers();
  console.log(allUsers);
  return (
    <div>
        <h1 className='px-8 py-2 text-white font-semibold bg-slate-800 rounded-lg'>Messages</h1>
        <div className=' flex-1 overflow-y-auto hide-scrollbar py-2' style={{maxHeight:"calc(84vh - 10vh)"}} >
           
            
         {allUsers.map((user,index)=>(
            <Users key={index} user={user}/>
          ))}   
        </div>
        
    </div>
  )
}

export default User