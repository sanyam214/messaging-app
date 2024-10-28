Full-Stack Application with React Frontend and Node.js or Django Backend

This project is a full-stack application with React as the frontend framework and either Node.js (recommended) or Django as the backend framework. The app provides user authentication, a chat feature, and session management.

Features
1. User registration and login
2. Chat functionality with session management
3. Frontend and backend tests for core functionalities

Technologies
1. Frontend: React, Jest (for testing)
2. Backend (Node.js): Express, MongoDB, JWT
3. Backend (Django): Django REST Framework, SQLite or PostgreSQL
4. esting: Jest (Frontend), Supertest (Node.js backend), Django TestCase (Django backend)

Prerequisites
1. Node.js (version 14+ recommended) and npm or yarn
2. Python (version 3.8+)
3. MongoDB (for Node.js backend)
4. SQLite/PostgreSQL (for Django backend)

Setup Instructions
1. Clone the Repository

run code ==> git clone https://github.com/sanyam214/messaging-app.git
cd messaging-app

Backend Setup - Node.js (Recommended)
1. Navigate to the Backend Directory

run code --> cd server

2. Install Dependencies

run code --> npm install

3. Set Up Environment Variables (Already there Not required, just for reference for future)
Create a .env file in the backend directory and add the following variables:

PORT=5000
DB_URI=messaging_app
JWT_SECRET=jwt_secret

4. Start the Node.js Server

run code --> npm start
The backend should now be running on http://localhost:5000.

Backend Setup - Django
1. Navigate to the Backend Directory

run code --> cd python

2. Create a Virtual Environment

run code --> python3 -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate

3. Install Dependencies

run code --> pip install -r requirements.txt

4. Set Up Environment Variables(Already there Not required, just for reference for future)
In the backend_django directory, create a .env file and add:

run code --> SECRET_KEY=secret_key
DATABASE_URL=messaging_app
DEBUG=True

5. Apply Migrations

run code --> python manage.py migrate

6. Start the Django Server

run code --> python manage.py runserver
The Django backend should now be running on http://localhost:8000.

Frontend Setup - React
1. Navigate to the Frontend Directory

run code --> cd components

2. Install Dependencies

run code --> npm install

3. Set Up Environment Variables
Create a .env file in the frontend directory:

For Node.js Backend:
REACT_APP_API_URL=http://localhost:5000
For Django Backend:
REACT_APP_API_URL=http://localhost:8000

4. Start the React App

run code --> npm start
The frontend will be available at http://localhost:3000.

Running the Application
To run the application, make sure:

Backend (Node.js or Django) server is running.
Frontend (React) server is running.
Node.js Backend + React: Open http://localhost:3000.
Django Backend + React: Open http://localhost:3000.


Testing the Application

Backend Tests - Node.js
To run backend tests (Node.js):
cd server
npm test

Frontend Tests - React
To run frontend tests:
cd components
npm test

Project Structure (Component Architecture)

messaging-app/
├── backend/                  # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── app.js
├── backend_django/           # Django backend
│   ├── myapp/
│   ├── manage.py
└── frontend/                 # React frontend
    ├── src/
    │   ├── components/
    │   ├── App.js
    │   └── index.js
    └── tests/                # tests

Common Commands

Node.js Backend
Start server: npm start
Run tests: npm test

Django Backend
Start server: python manage.py runserver
Run tests: python manage.py test

React Frontend
Start frontend: npm start
Run tests: npm test