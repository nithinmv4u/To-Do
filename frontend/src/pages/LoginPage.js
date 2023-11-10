import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {

    const { loginUser } = useContext(AuthContext)

    return(
        <div className="flex flex-col items-center justify-center h-[100%]">
        <p className="text-2xl font-semibold mb-6">Login Page</p>
        <form onSubmit={loginUser} className="bg-white p-6 shadow-md rounded-lg">
            <input
            type="text"
            name="username"
            placeholder="Enter Username"
            className="w-full mb-4 p-2 border rounded"
            />
            <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="w-full mb-4 p-2 border rounded"
            />
            <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            >
            Login
            </button>
            <button
            className="w-full bg-blue-500 text-white mt-1 p-2 rounded hover:bg-blue-700"
            >
            Sign UP
            </button>
        </form>
        </div>

        
    )
}

export default LoginPage