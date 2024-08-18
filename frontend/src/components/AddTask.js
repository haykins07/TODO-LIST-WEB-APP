import React, { useState } from 'react';

// Component for adding a new task
function AddTask({ onAdd }) {
    // State hooks for managing input fields
    const [title, setTitle] = useState(''); // For task title
    const [description, setDescription] = useState(''); // For task description (optional)
    const [reminder, setReminder] = useState(''); // For reminder date and time

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Validation: Check if the title is not empty
        if (!title) {
            alert('Task title cannot be empty'); // Show an alert if the title is empty
            return;
        }

        // Validation: Check if the reminder date is in the future
        if (new Date(reminder) < new Date()) {
            alert('Cannot set a past date and time'); // Show an alert if the reminder is in the past
            return;
        }

        // Call the onAdd function passed as a prop with the new task details
        onAdd({ title, description, reminder });

        // Reset the input fields after adding the task
        setTitle('');
        setDescription('');
        setReminder('');
    };

    return (
        // Form element with an onSubmit handler
        <form onSubmit={handleSubmit}>
            {/* Input field for task title */}
            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            {/* Input field for task description (optional) */}
            <input
                type="text"
                placeholder="Description (Optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            {/* Input field for reminder date and time */}
            <input
                type="datetime-local"
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
            />
            {/* Submit button to add the task */}
            <button type="submit">Add Task</button>
        </form>
    );
}

export default AddTask;
