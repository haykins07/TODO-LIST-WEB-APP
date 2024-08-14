import React, { useState } from 'react';

function TaskItem({ task, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [reminder, setReminder] = useState(task.reminder);

    const handleUpdate = () => {
        if (!title) {
            alert('Task title cannot be empty');
            return;
        }
        if (new Date(reminder) < new Date()) {
            alert('Cannot set a past date and time');
            return;
        }
        onUpdate(task._id, { title, description, reminder });
        setIsEditing(false);
    };

    return (
        <div className="task-item">
            {isEditing ? (
                <>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
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
