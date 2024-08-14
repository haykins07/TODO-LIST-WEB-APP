const form = document.getElementById('task-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value;
    const dueDate = document.getElementById('task-due').value;
    const priority = document.getElementById('task-priority').value;
    const now = new Date();

    if (!title.trim()) {
        alert("Task title cannot be empty.");
        return;
    }

    if (new Date(dueDate) <= now) {
        alert("Please choose a future date and time.");
        return;
    }

    await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, dueDate, priority, completed: false })
    });

    // Scroll back to the top after adding a task
    window.scrollTo({ top: 0, behavior: 'smooth' });

    fetchTasks();
    form.reset();
});

async function fetchTasks() {
    try {
        const response = await fetch('http://localhost:5000/tasks');
        let tasks = await response.json();

        // Apply filtering
        const filter = document.getElementById('filter-priority').value;
        if (filter !== "All") {
            tasks = tasks.filter(task => task.priority === filter);
        }

        // Apply sorting
        const sortType = document.getElementById('sort-tasks').value;
        if (sortType === 'date') {
            tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        } else if (sortType === 'alphabetical') {
            tasks.sort((a, b) => a.title.localeCompare(b.title));
        } else {
            // Sort tasks by priority: High first, then Medium, then Low
            tasks.sort((a, b) => {
                const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            });
        }

        const taskContainer = document.getElementById('tasks');
        taskContainer.innerHTML = '';

        tasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.className = 'task';
            taskDiv.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>Due: ${new Date(task.dueDate).toLocaleString()}</p>
                <p>Priority: ${task.priority}</p>
                <button class="edit" onclick="startEditTask('${task._id}')">Edit</button>
                <button class="delete" onclick="deleteTask('${task._id}')">Delete</button>
                <div class="edit-form-container" id="edit-form-${task._id}" style="display: none;">
                    <input type="text" id="edit-title-${task._id}" value="${task.title}" placeholder="Task Title" required>
                    <textarea id="edit-desc-${task._id}" placeholder="Task Description">${task.description}</textarea>
                    <input type="datetime-local" id="edit-due-${task._id}" value="${task.dueDate.slice(0, 16)}">
                    <select id="edit-priority-${task._id}">
                        <option value="Low" ${task.priority === 'Low' ? 'selected' : ''}>Low</option>
                        <option value="Medium" ${task.priority === 'Medium' ? 'selected' : ''}>Medium</option>
                        <option value="High" ${task.priority === 'High' ? 'selected' : ''}>High</option>
                    </select>
                    <button class="update" onclick="submitEditTask('${task._id}')">Update Task</button>
                    <button class="cancel" onclick="cancelEditTask('${task._id}')">Cancel</button>
                </div>
            `;
            taskContainer.appendChild(taskDiv);

            // Initialize flatpickr for the edit due date input
            flatpickr(`#edit-due-${task._id}`, {
                enableTime: true,
                dateFormat: "Y-m-d H:i",
                minDate: "today",
                time_24hr: true,
                locale: {
                    firstDayOfWeek: 1 // Start the week on Monday
                }
            });
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

async function deleteTask(id) {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
}

function startEditTask(id) {
    document.getElementById(`edit-form-${id}`).style.display = 'block';
}

function cancelEditTask(id) {
    document.getElementById(`edit-form-${id}`).style.display = 'none';
}

async function submitEditTask(id) {
    const title = document.getElementById(`edit-title-${id}`).value;
    const description = document.getElementById(`edit-desc-${id}`).value;
    const dueDate = document.getElementById(`edit-due-${id}`).value;
    const priority = document.getElementById(`edit-priority-${id}`).value;
    const completed = false;

    if (!title.trim()) {
        alert("Task title cannot be empty.");
        return;
    }

    await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, dueDate, priority, completed })
    });

    fetchTasks();
}

function filterTasks() {
    fetchTasks();
}

function sortTasks() {
    fetchTasks();
}

// Initialize flatpickr for the task creation due date input
document.addEventListener('DOMContentLoaded', function () {
    flatpickr("#task-due", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        minDate: "today",
        time_24hr: true,
        defaultDate: new Date(),
        locale: {
            firstDayOfWeek: 1 // Start the week on Monday
        }
    });
});

// Fetch tasks when the page loads and refresh every 2 seconds
fetchTasks();

