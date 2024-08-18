import React, { useState } from 'react';
import Header from './components/Header';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import './styles.css';

function App() {
    // State to hold the list of tasks
    const [tasks, setTasks] = useState([]);

    // Function to add a new task to the list
    const addTask = (task) => {
        // Create a new array with the existing tasks and the new task, then update the state
        setTasks([...tasks, task]);
    };

    // Function to delete a task by its id
    const deleteTask = (id) => {
        // Filter out the task with the matching id and update the state with the remaining tasks
        setTasks(tasks.filter(task => task.id !== id));
    };

    // Function to update a task by its id
    const updateTask = (id, updatedTask) => {
        // Map over the tasks, and replace the task with the matching id with the updated task
        setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
    };

    return (
        <div className="container">
            {/* Render the Header component */}
            <Header />

            {/* Render the AddTask component, passing down the addTask function as a prop */}
            <AddTask onAdd={addTask} />

            {/* Render the TaskList component, passing down the tasks array, deleteTask, and updateTask functions as props */}
            <TaskList tasks={tasks} onDelete={deleteTask} onUpdate={updateTask} />
        </div>
    );
}

export default App;
