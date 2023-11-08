import React, { useState } from "react";
import useAxios from "../utils/useAxios";

const TaskEditForm = ({OnSave, task}) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const parsedDate = new Date(task.due_date);
    const formattedDueDate = parsedDate.toISOString().slice(0, 16);
    const [dueDate, setDueDate] = useState(formattedDueDate);
    const [error, setError] = useState('')
    const api = useAxios()

    const handleSubmit = async () =>{
        try{
            const response = await api.patch(`/api/tasks/${task.id}`,{
                title : title,
                description : description,
                due_date : dueDate,
            });
            console.log("create: ",response);
            console.log("status: ",response.status);
            if (response.status === 200){
                console.log("200 status");
                OnSave()
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
            <button onClick={handleSubmit}>Update</button>
            {error && <p>{error}</p>}
        </div>
    )
}

export default TaskEditForm;