// Get the form element from the DOM
const form = document.getElementById('task-form');

// Add an event listener for form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get the values from the form inputs
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value;
    const dueDate = document.getElementById('task-due').value;
    const priority = document.getElementById('task-priority').value;
    const now = new Date();

    // Validate the title input to ensure it's not empty
    if (!title.trim()) {
        alert("Task title cannot be empty.");
        return;
    }

    // Validate that the due date is in the future
    if (new Date(dueDate) <= now) {
        alert("Please choose a future date and time.");
        return;
    }

    // Send a POST request to the server to add a new task
    await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, dueDate, priority, completed: false }) // Create a new task object
    });

    // Scroll back to the top of the page after adding a task
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Refresh the task list
    fetchTasks();
    form.reset(); // Reset the form inputs
});

// Function to fetch and display tasks
async function fetchTasks() {
    try {
        const response = await fetch('http://localhost:5000/tasks'); // Fetch tasks from the server
        let tasks = await response.json(); // Parse the JSON response

        // Apply filtering based on priority
        const filter = document.getElementById('filter-priority').value;
        if (filter !== "All") {
            tasks = tasks.filter(task => task.priority === filter);
        }

        // Apply sorting based on the selected option
        const sortType = document.getElementById('sort-tasks').value;
        if (sortType === 'date') {
            tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)); // Sort by due date
        } else if (sortType === 'alphabetical') {
            tasks.sort((a, b) => a.title.localeCompare(b.title)); // Sort alphabetically by title
        } else {
            // Sort tasks by priority: High first, then Medium, then Low
            tasks.sort((a, b) => {
                const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            });
        }

        // Get the task container element and clear its content
        const taskContainer = document.getElementById('tasks');
        taskContainer.innerHTML = '';

        // Loop through the tasks and create HTML elements for each one
        tasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.className = 'task'; // Set the class name for styling
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
            taskContainer.appendChild(taskDiv); // Append the task to the container

            // Initialize flatpickr for the due date input in the edit form
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
        console.error('Error fetching tasks:', error); // Log any errors that occur during fetching
    }
}

// Function to delete a task by its ID
async function deleteTask(id) {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' }); // Send a DELETE request to the server
    fetchTasks(); // Refresh the task list
}

// Function to start editing a task by showing the edit form
function startEditTask(id) {
    document.getElementById(`edit-form-${id}`).style.display = 'block'; // Show the edit form
}

// Function to cancel the editing of a task by hiding the edit form
function cancelEditTask(id) {
    document.getElementById(`edit-form-${id}`).style.display = 'none'; // Hide the edit form
}

// Function to submit the updated task data
async function submitEditTask(id) {
    // Get the updated values from the edit form inputs
    const title = document.getElementById(`edit-title-${id}`).value;
    const description = document.getElementById(`edit-desc-${id}`).value;
    const dueDate = document.getElementById(`edit-due-${id}`).value;
    const priority = document.getElementById(`edit-priority-${id}`).value;
    const completed = false;

    // Validate the title input to ensure it's not empty
    if (!title.trim()) {
        alert("Task title cannot be empty.");
        return;
    }

    // Send a PUT request to the server to update the task
    await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, dueDate, priority, completed }) // Send the updated task object
    });

    fetchTasks(); // Refresh the task list
}

// Function to apply task filtering based on priority
function filterTasks() {
    fetchTasks();
}

// Function to apply task sorting based on the selected criteria
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
