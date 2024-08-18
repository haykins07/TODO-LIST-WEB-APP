// Importing required modules
const express = require('express'); // Importing Express.js for building the server
const mongoose = require('mongoose'); // Importing Mongoose for MongoDB interaction
const cors = require('cors'); // Importing CORS for handling cross-origin requests

// Initializing the Express app
const app = express();
const port = 5000; // Defining the port number on which the server will run

// Connecting to the MongoDB database named 'todo-list'
mongoose.connect('mongodb://localhost/todo-list', {
  useNewUrlParser: true, // Use the new MongoDB connection string parser
  useUnifiedTopology: true, // Use the new MongoDB server discovery and monitoring engine
});

// Defining the schema for a task in the to-do list
const taskSchema = new mongoose.Schema({
  title: String,        // Title of the task
  description: String,  // Description of the task
  dueDate: Date,        // Due date of the task
  priority: String,     // Priority level of the task (e.g., High, Medium, Low)
  completed: Boolean,   // Completion status of the task
});

// Creating a Mongoose model for the 'Task' schema
const Task = mongoose.model('Task', taskSchema);

// Middleware setup
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// Route to get all tasks from the database
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find(); // Fetch all tasks from the database
  res.json(tasks); // Send the tasks as a JSON response
});

// Route to create a new task
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body); // Create a new task with the data from the request body
  await task.save(); // Save the task to the database
  res.json(task); // Send the saved task as a JSON response
});

// Route to delete a task by its ID
app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id); // Find the task by ID and delete it from the database
  res.json({ message: 'Task deleted' }); // Send a confirmation message as a JSON response
});

// Route to update a task by its ID
app.put('/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Find the task by ID and update it with the data from the request body, returning the updated task
  res.json(task); // Send the updated task as a JSON response
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`); // Log a message indicating that the server is running
});
