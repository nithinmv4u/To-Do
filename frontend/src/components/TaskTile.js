import React from "react"
const TaskTile = ({ task, handleEditTask, handleTaskCompletion, handleDeleteTask }) =>{
    const parsedDate = new Date(task.due_date);
    const date = parsedDate.toISOString().slice(0, 10);
    const time = parsedDate.toISOString().slice(11, 16);
    return(
        <div className="bg-cyan-600 flex text-white rounded-lg p-2 mb-2">
        <li key={task?.id} className="flex w-[100%]">
            <div className="w-2/3">
                <h3 className="text-lg font-semibold mb-2">{task?.title}</h3>
                <p className="text-sm mb-2">{task?.description}</p>
                <p className="text-sm">Date: {date} Time: {time}</p>
            </div>
            
            <div className="flex flex-col w-1/3 items-center">
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
                className="bg-cyan-800 hover:bg-cyan-900 text-white px-3 py-1 rounded focus:outline-none"
            >
                Edit
            </button>
            <button
                onClick={() => handleDeleteTask(task.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded focus:outline-none"
            >
                Delete
            </button>
            </div>
        </li>
        </div>

    )
}

export default TaskTile;