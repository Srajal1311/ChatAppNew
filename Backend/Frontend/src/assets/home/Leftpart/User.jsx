import React from 'react'
import Users from './Users'
import useGetAllUsers from '../../../context/useGetAllUsers'

function User() {
  const [allUsers, loading] = useGetAllUsers();
  console.log(allUsers);

  return (
    <div className="flex flex-col h-full">
      {/* 🔹 Fixed Heading */}
      <div className="px-8 py-2 text-white font-semibold bg-slate-800">
        Messages
      </div>

      {/* 🔹 Scrollable Users List */}
      <div className="flex-1 overflow-y-auto hide-scrollbar py-2">
        {!loading && allUsers.map((user, index) => (
          <Users key={index} user={user} />
        ))}
      </div>
    </div>
  )
}

export default User
