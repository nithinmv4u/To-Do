import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Header = () => {
    const { user, logoutUser } = useContext(AuthContext)
    return (
        <div className="bg-indigo-800">
            {
                user ? <div className="flex justify-around items-center p-2 font-bold text-white">
                    <h1>{user.username}'s Todo</h1>
                    <button className="hover:text-yellow-200 bg-orange-700 rounded-md p-2 mx-2"  onClick={() => {
                        logoutUser();
                    }}>Logout</button>
                    </div>
                : <div className="flex justify-around items-center p-2 font-bold text-white"><h1>ToDo App</h1></div> 
            }
            
        </div>
    )
}

export default Header;