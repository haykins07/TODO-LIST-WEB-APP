import React, { useState } from 'react';

function AddTask({ onAdd }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [reminder, setReminder] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) {
            alert('Task title cannot be empty');
            return;
        }
        if (new Date(reminder) < new Date()) {
            alert('Cannot set a past date and time');
            return;
        }
        onAdd({ title, description, reminder });
        setTitle('');
        setDescription('');
        setReminder('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description (Optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="datetime-local"
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
            />
            <button type="submit">Add Task</button>
        </form>
    );
}

export default AddTask;
