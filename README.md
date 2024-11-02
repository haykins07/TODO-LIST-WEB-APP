TODO List Web App

A simple to-do list application designed to help users manage their tasks efficiently. Built with a Node.js backend and a React frontend, this app uses MongoDB for data storage.

 Features
- Add, edit, and delete tasks
- Mark tasks as completed
- Responsive design for desktop and mobile use

 Requirements
- [Node.js](https://nodejs.org/) (v12 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (installed and running locally)

 Installation Instructions

 1. Clone the Repository
```bash
git clone https://github.com/haykins07/TODO-LIST-WEB-APP.git
cd TODO-LIST-WEB-APP
```

 2. Install Backend Dependencies
Navigate to the `backend/` folder and install the necessary Node.js dependencies:
```bash
cd backend
npm install
```

 3. MongoDB Setup
Ensure MongoDB is installed and running locally.

- Install MongoDB: Follow the [installation instructions](https://www.mongodb.com/try/download/community) for your operating system.
- **Start MongoDB Server:
  ```bash
  mongod
  ```
  
- Create and Configure Database:
  Open another terminal and create a database named `todo-list`:
  ```bash
  mongo
  use todo-list
  ```

- Configure Connection:
  Update the MongoDB connection URL in the backend configuration file (`backend/.env`) to:
  ```plaintext
  MONGODB_URI=mongodb://localhost:27017/todo-list
  ```
  Verify MongoDB is accessible by running `mongo` and listing databases with `show dbs`.

4. Start the Backend Server
From the `backend/` directory, run:
```bash
npm start
```
The backend server should be available at `http://localhost:5000`.

5. Install Frontend Dependencies
Navigate to the `frontend/` folder and install the necessary React dependencies:
```bash
cd ../frontend
npm install
```

6. Specify the Location of `index.html`
The `index.html` file, the main entry point for the React frontend, is located in `frontend/public/`.

7. Start the Frontend
In the `frontend/` directory, run:
```bash
npm start
```
The frontend will be available at `http://localhost:8080`.

8. Open the Application
Once both servers are running, open your browser and navigate to `http://localhost:8080` to interact with the app.
