👤 User Management System

A full-stack web application for managing users with authentication and CRUD operations. The system is connected to a cloud-hosted MySQL database (Aiven) and includes both frontend and backend services.

🚀 Live Demo

👉 https://wabi-user-management.netlify.app/

📂 Project Structure
client/ – Contains the client-side application (UI)
backend/ – Contains the REST API built with Node.js and Express
✨ Features
User registration and login
JWT-based authentication
CRUD operations on users
MySQL database integration (Aiven)
Clear separation between frontend and backend
🛠️ Tech Stack
Frontend: React / Vue / Angular
Backend: Node.js, Express.js
Database: MySQL (Aiven Cloud)
Authentication: JWT
API: RESTful services
⚙️ Installation & Usage

1. Clone the repository
git clone https://github.com/HayiderHasan18/user-management.git

cd user-management-system

3. Setup Backend
   
cd backend

npm install

nodemon server.js

Create a .env file inside the backend folder:

DB_HOST=your_host

DB_USER=your_user

DB_PASSWORD=your_password

DB_NAME=your_database

JWT_SECRET=your_secret

PORT=5000

3. Setup Frontend
   
cd client

npm install

npm run dev

5. Run the Application
   
Open your browser
Visit: http://localhost:5173 (or the port shown in terminal)
Register or login to use the system

🎯 Purpose

This project was developed to demonstrate full-stack development skills, including authentication, REST API design, and database integration using a real-world architecture.

👨‍💻 Author

Hayider Hasan
GitHub: https://github.com/HayiderHasan18
