import React, { useState } from 'react';
import Header from './components/Header';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import './styles.css';

function App() {
    const [tasks, setTasks] = useState([]);

    const addTask = (task) => {
        setTasks([...tasks, task]);
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const updateTask = (id, updatedTask) => {
        setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
    };

    return (
        <div className="container">
            <Header />
            <AddTask onAdd={addTask} />
            <TaskList tasks={tasks} onDelete={deleteTask} onUpdate={updateTask} />
        </div>
    );
}

export default App;
