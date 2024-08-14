import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete, onUpdate }) {
    return (
        <div>
            {tasks.map((task) => (
                <TaskItem key={task._id} task={task} onDelete={onDelete} onUpdate={onUpdate} />
            ))}
        </div>
    );
}

export default TaskList;
