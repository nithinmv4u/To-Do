import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { jwtDecode as jwt_decode} from "jwt-decode";
// import axiosInstance from "../utils/axiosInstance";
import useAxios from "../utils/useAxios";

const HomePage = () => {
    const {authToken, logoutUser} = useContext(AuthContext)
    const [tasks, setTasks] = useState([]);
    const api = useAxios()
    console.log("at homepage");

    console.log(tasks);
    console.log("access HomePage",jwt_decode(authToken.access));

    const getTasks = async() => {
        console.log("get Tasks");
        const response = await api.get('/api/tasks/');
        console.log("response : ",response);
        if(response.status === 200){
            setTasks(response.data)
        }else{
            logoutUser();
        }
    }

    useEffect(() => {
        console.log("useEffect");
        getTasks()
    },[]);


    return tasks.length ? (
        <div>
            <p>Homepage</p>
            <ul>
                { tasks.map((task) =>(
                        <li key={task?.id}>
                            <p>{ task?.title }</p>
                            <p>{ task?.description}</p>
                        </li>
                ))}
            </ul>
        </div>
    ) : (
        <p>no tasks present</p>
    )
}

export default HomePage