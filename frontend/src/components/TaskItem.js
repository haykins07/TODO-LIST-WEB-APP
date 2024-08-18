import React, { useState } from 'react';

function TaskItem({ task, onDelete, onUpdate }) {
    // State variables to manage editing state and form inputs
    const [isEditing, setIsEditing] = useState(false); // Tracks whether the task is in edit mode
    const [title, setTitle] = useState(task.title); // Manages the task title input
    const [description, setDescription] = useState(task.description); // Manages the task description input
    const [reminder, setReminder] = useState(task.reminder); // Manages the task reminder input

    // Function to handle task updates
    const handleUpdate = () => {
        // Validation: Ensure the task title is not empty
        if (!title) {
            alert('Task title cannot be empty');
            return;
        }
        // Validation: Ensure the reminder date is not in the past
        if (new Date(reminder) < new Date()) {
            alert('Cannot set a past date and time');
            return;
        }
        // Call the onUpdate function passed as a prop to update the task
        onUpdate(task._id, { title, description, reminder });
        setIsEditing(false); // Exit edit mode after saving
    };

    return (
        <div className="task-item">
            {isEditing ? (
                // Render edit form if in editing mode
                <>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type="datetime-local"
                        value={new Date(reminder).toISOString().substring(0, 16)}
                        onChange={(e) => setReminder(e.target.value)}
                    />
                    <button onClick={handleUpdate}>Save</button>
                </>
            ) : (
                // Render task details if not in editing mode
                <>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>{new Date(task.reminder).toLocaleString()}</p>
                    <button className="edit" onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => onDelete(task._id)}>Delete</button>
                </>
            )}
        </div>
    );
}

export default TaskItem;
