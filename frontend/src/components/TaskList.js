import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete, onUpdate }) {
    return (
        <div>
            {tasks.map((task) => (
                // For each task, render a TaskItem component
                <TaskItem 
                    key={task._id} // Unique key for each task, helps React manage rendering efficiently
                    task={task} // Pass the task object as a prop to TaskItem
                    onDelete={onDelete} // Pass the onDelete function as a prop to TaskItem
                    onUpdate={onUpdate} // Pass the onUpdate function as a prop to TaskItem
                />
            ))}
        </div>
    );
}

export default TaskList;
