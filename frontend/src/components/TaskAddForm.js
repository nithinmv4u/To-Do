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
        <div>
            <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
            <input type="text" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
            <input type="datetime-local" placeholder="Due Date" value={dueDate} onChange={(e)=>setDueDate(e.target.value)} />
            <button onClick={handleSubmit}>Add</button>
            {error && <p>{error}</p>}
        </div>
    )
}

export default TaskAddForm;