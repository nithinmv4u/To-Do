import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children , ...rest }) => {
    console.log(rest, "private route");
    const {user} = useContext(AuthContext);
    console.log("user: ",user);
    if(user)console.log("user presernt");
    else console.log("user unavailable");
    // const authenticated = user ? true : false
    return (
        <Routes>
            {<Route {...rest} element={user ? children : <Navigate to='/login' replace />}/>}
        </Routes>

    )
}

export default PrivateRoute;