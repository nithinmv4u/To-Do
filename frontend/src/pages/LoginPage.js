import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {

    const { loginUser, handleSignUp } = useContext(AuthContext)

    return(
        <div className='flex flex-col justify-center items-center h-screen' style={{ background: `url('public_assets/ferris-wheel-dubai.jpg')`, backgroundSize: 'cover' }}>
            <div className="w-4/8 bg-cyan-400 rounded-md p-8 shadow-md drop-shadow-2xl bg-opacity-70">
            <p className="text-cyan-950 font-semibold mb-6">Please enter your credentials : </p>
            <form onSubmit={loginUser} className="bg-gradient-to-r from-cyan-900 to-orange-600 hover:from-orange-600 hover:to-cyan-900 p-6 shadow-md rounded-lg">
                <input
                type="text"
                name="username"
                placeholder="Enter Username"
                className="w-full my-4 p-2 border rounded"
                />
                <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="w-full my-4 p-2 border rounded"
                />
                <div className="my-4 flex justify-around">
                    <button onClick={handleSignUp}
                    className="w-1/4 bg-cyan-700 text-white p-2 rounded hover:bg-blue-700"
                    >
                    Sign UP
                    </button>
                    <button
                    type="submit"
                    className="w-1/4 bg-cyan-700 text-white p-2 rounded hover:bg-blue-700"
                    >
                    Login
                    </button>
                </div>
            </form>
            </div>
        </div>
        
    )
}

export default LoginPage