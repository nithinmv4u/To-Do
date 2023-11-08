import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { jwtDecode as jwt_decode} from "jwt-decode";
// import axiosInstance from "../utils/axiosInstance";
import useAxios from "../utils/useAxios";
import TaskAddForm from "../components/TaskAddForm";
import TaskEditForm from "../components/TaskEditForm";
import TaskTile from "../components/TaskTile";

const HomePage = () => {
    const {authToken, logoutUser} = useContext(AuthContext)
    const [tasks, setTasks] = useState([]);
    const [showAddTask, setShowAddTask] = useState(false)
    const [showEditTask, setShowEditTask] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState('')
    const api = useAxios()
    console.log("at homepage");

    console.log(tasks);
    console.log(tasks.count);
    console.log("access HomePage",jwt_decode(authToken.access));

    const getTasks = async(page) => {
        console.log("get Tasks");
        const response = await api.get(`/api/tasks/?page=${page}`);
        console.log("response : ",response);
        if(response.status === 200){
            setTasks(response.data)
        }else{
            logoutUser();
        }
    }

    useEffect(() => {
        console.log("useEffect");
        getTasks(currentPage)
    },[currentPage]);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    
    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleAddTask = () =>{
        console.log("at handleAddTask");
        setShowAddTask(!showAddTask)
        getTasks(currentPage)
    }
    const handleEditTask = (task) =>{
        console.log("at handleAddTask");
        setShowEditTask(task)
    }

    const OnSave = () => {
        console.log("at save");
        getTasks(currentPage);
        setShowEditTask(null)
    };

    const handleTaskCompletion = async (taskId, isCompleted) =>{
        try{
            const response = await api.patch(`/api/tasks/${taskId}`,{
                is_completed : isCompleted,
            });
            console.log("complete: ",response);
            console.log("status: ",response.status);
            if (response.status === 200){
                console.log("200 status");
                getTasks(currentPage)
            }
        }
        catch(error){
            setError('some error occured, try again !')
        }
    }

    const handleDeleteTask = async (taskId) =>{
        try{
            const response = await api.delete(`/api/tasks/${taskId}`);
            console.log("complete: ",response);
            console.log("status: ",response.status);
            if (response.status === 204){
                console.log("200 status");
                getTasks(currentPage);
            }
        }
        catch(error){
            setError('some error occured, try again !')
        }
    }

    const homeContext = {
        handleEditTask : handleEditTask,
        handleTaskCompletion : handleTaskCompletion,
        handleDeleteTask : handleDeleteTask,
    }


    return tasks?.count ? (
        <div className="h-fit">
            <ul>
                { tasks.results.map((task) =>(<TaskTile task={task}  {...homeContext} />))}
                {showEditTask && <TaskEditForm OnSave={OnSave} task={showEditTask}/>}
            </ul>
            {tasks.previous && <button onClick={handlePreviousPage}>Previous</button>}
            {tasks.next && <button onClick={handleNextPage}>Next</button>}
            <div>                
            {
                showAddTask ? (
                        <>
                        <TaskAddForm handleAddTask={handleAddTask}/>
                        <button className="hover:text-yellow-200 bg-orange-700 rounded-md p-2 mx-2" onClick={()=>handleAddTask()}>Close</button>
                        </>
                    ) : (
                        <button className="hover:text-yellow-200 bg-orange-700 rounded-md p-2 mx-2" onClick={()=>handleAddTask()}>Add Task</button>
                    )
            }
            </div>
        </div>
    ) : (
        <>
        <p>no tasks present</p>
        {
                showAddTask ? (
                        <>
                        <TaskAddForm handleAddTask={handleAddTask}/>
                        <button onClick={()=>handleAddTask()}>Close</button>
                        </>
                    ) : (
                        <button className="hover:text-yellow-200 bg-orange-700 rounded-md p-2 mx-2" onClick={()=>handleAddTask()}>Add Task</button>
                    )
        }
        </>
        
    )
}

export default HomePage