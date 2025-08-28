import Logout from "./logout"
import Search from "./search"
import User from "./user"


function Left() {
  return (
    <div className="w-[30%] h-screen flex flex-col text-gray-300 bg-black" ><Search/>
    <div className="flex-1 overflow-y-auto" style={{minHeight:"calc(84vh - 4vh)"}}>
        <User/>
    </div>    

    <Logout/>
    
    </div>
    
  )
}

export default Left