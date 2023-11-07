import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Header = () => {
    const { user, logoutUser } = useContext(AuthContext)
    return (
        <div>
            {
                user ? <>
                    <h1>{user.username}'s Todo</h1>
                    <button className="hover:text-yellow-200 bg-orange-700 rounded-md p-2 mx-2"  onClick={() => {
                        logoutUser();
                    }}>Logout</button>
                    </>
                : <h1>ToDo App</h1>
            }
            
        </div>
    )
}

export default Header;