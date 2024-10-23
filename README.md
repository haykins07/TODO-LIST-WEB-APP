To-Do List Web App

This project is a simple To-Do List web application developed as part of a course project.

 Project Structure

- `backend/`: Contains the Node.js backend code.
- `frontend/`: Contains the React frontend code.
- `docs/`: Contains documentation files for the project.

 Installation Instructions

1. Clone the Repository:
   ```bash
   git clone https://github.com/haykins07/TODO-LIST-WEB-APP.git
   cd TODO-LIST-WEB-APP
   ```

2. Install Backend Dependencies:
   Navigate to the `backend/` folder and install the necessary Node.js dependencies:
   ```bash
   cd backend
   npm install
   ```

3. MongoDB Setup:
   Ensure you have MongoDB installed and running locally.
   For Local MongoDB:
     1. Install MongoDB from [the official website](https://www.mongodb.com/try/download/community) and follow the installation instructions for your operating system.
     2. Start the MongoDB server by running `mongod` in your terminal.
     3. Create a database named `todo-list` by running the following commands in a separate terminal:
        ```bash
        mongo
        use todo-list
        ```
     4. Ensure the database is accessible by checking that it is running correctly.

4. Start the Backend Server:
   Run the following command to start the Node.js backend server:
   ```bash
   npm start
   ```
   The backend server will start at `http://localhost:5000` (if you change the default port, specify this).

5. Install Frontend Dependencies:
   Navigate to the `frontend/` folder and install the necessary React dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

6. Start the Frontend:
   Run the following command to start the React frontend:
   ```bash
   npm start
   ```
   The frontend will be available at `http://localhost:3000`.

7.Open the Application:
   After starting both the backend and frontend, open your browser and navigate to `http://localhost:3000` to view and interact with the app. Ensure both servers are running and accessible.

