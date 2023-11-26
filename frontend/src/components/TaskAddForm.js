import React, { useState } from "react";
import useAxios from "../utils/useAxios";

const TaskAddForm = ({handleAddTask}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [error, setError] = useState('')
    const api = useAxios()

    const handleSubmit = async () =>{
        try{
            const response = await api.post('/api/tasks/',{
                title : title,
                description : description,
                due_date : dueDate
            });
            console.log("create: ",response);
            console.log("status: ",response.status);
            if (response.status === 201){
                console.log("201 status");
                handleAddTask()
            }
        }
        catch(error){
            setError('some error occured, try again !')
        }
    }

    return (
        <div className="p-2 m-2 bg-cyan-600 rounded-md flex flex-col bg-opacity-75">
            <input className="p-1 rounded-sm m-1" type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
            <input className="p-1 rounded-sm m-1 h-20" type="text" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
            <input className="p-1 rounded-sm m-1 w-2/3" type="datetime-local" placeholder="Due Date" value={dueDate} onChange={(e)=>setDueDate(e.target.value)} />
            <button className="text-white p-2 bg-cyan-700 m-2 rounded-sm hover:shadow-md hover:shadow-green-400" onClick={handleSubmit}>Add</button>
            <input className="p-1 rounded-sm m-1 w-2/3" type="datetime-local" placeholder="Due Date" value={dueDate} onChange={(e)=>setDueDate(e.target.value)} />
            <button className="text-white p-2 bg-cyan-700 m-2 rounded-sm hover:shadow-md hover:shadow-green-400" onClick={handleSubmit}>Add</button>
            {error && <p>{error}</p>}
        </div>
    )
}

export default TaskAddForm;