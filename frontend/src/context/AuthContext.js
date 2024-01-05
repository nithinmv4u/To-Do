import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(() => localStorage.getItem('authToken') ? jwtDecode(localStorage.getItem('authToken')) : null);
    const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    console.log("authToken : ",authToken);

    const loginUser = async (e) => {
        e.preventDefault()
        console.log("form submit ready");
        console.log("entered username: ", e.target.username.value)
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({'username' : e.target.username.value , 'password' : e.target.password.value}),
        })
        let data = await response.json()
        console.log('data: ',data);
        console.log('response: ',response);
        console.log(jwtDecode(data.access));
        if(response.status === 200){
            setUser(jwtDecode(data.access));
            setAuthToken(data);
            localStorage.setItem('authToken', JSON.stringify(data));
            console.log("localstorege stored");
            navigate('/')
        }
        else{
            alert("something went wrong..!\n"+ data?.detail);
        }        
    }

    useEffect(()=>{
        if(authToken){
            setUser(jwtDecode(authToken.access))
        }
        setLoading(false)
    },[authToken, loading])

    const logoutUser = () => {
        setUser(null);
        setAuthToken(null)
        localStorage.removeItem('authToken');
        navigate('/login')
    }

    const handleSignUp = () => {
        return ()=>{
            navigate('/signup')
        }
    }

    const contextData = {
        user : user,
        authToken : authToken,
        setUser : setUser,
        setAuthToken : setAuthToken,
        loginUser : loginUser,
        logoutUser : logoutUser,
        handleSignUp : handleSignUp, 
    }
    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}