import React from "react"
const TaskTile = ({ task, handleEditTask, handleTaskCompletion, handleDeleteTask }) =>{
    const parsedDate = new Date(task.due_date);
    const date = parsedDate.toISOString().slice(0, 10);
    const time = parsedDate.toISOString().slice(11, 16);
    return(
        <div className="bg-cyan-600 text-white rounded-lg p-2 m-2 bg-opacity-80">
        <li key={task?.id} className="flex justify-around p-2">
            <div className="w-2/4">
                <h3 className="text-lg font-semibold mb-2">{task?.title}</h3>
                <p className="text-sm mb-2">{task?.description}</p>
                <p className="text-sm">Date: {date} Time: {time}</p>
            </div>
            
            <div className="flex flex-col w-1/4 items-center">
                <label className="flex items-center">
                    <input
                    type="checkbox"
                    checked={task.is_completed}
                    onChange={() => handleTaskCompletion(task.id, !task.is_completed)}
                    />
                    <span className="text-sm font-medium">Completed</span>
                </label>
                <button
                    onClick={() => handleEditTask(task)}
                    className="hover:shadow-md hover:shadow-green-500 text-white px-3 py-1 rounded-full"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="hover:shadow-md hover:shadow-red-700 text-white px-3 py-1 rounded-full "
                >
                    Delete
                </button>
            </div>
        </li>
        </div>

    )
}

export default TaskTile;