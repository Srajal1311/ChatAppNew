import Logout from "./Logout.jsx"
import Search from "./Search.jsx"
import User from "./User.jsx"


function Left() {
  return (
    <div className="w-[30%] h-screen flex flex-col text-gray-300 bg-black overflow-hidden" >
       {/* 🔹 Search fixed at the top */}
      <div className="p-1 border-b border-gray-700">
      <Search/>
      </div>
     {/* 🔹 Users list scrollable in the middle */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <User />
      </div>  

    <Logout/>
    
    </div>
    
  )
}

export default Left