# 🎓 BISU Peer-to-Peer Tutoring System

A full-stack tutoring platform for BISU students. It streamlines the entire tutoring workflow — from finding a tutor, requesting a session, to real-time-like messaging — built with modern technologies and deployed.

## 🚀 Features

### 🧑‍🎓 Students
- Browse and search tutors by subject or department
- Request tutoring sessions (with calendar selector)
- View top-rated and favorite tutors
- See session history and tutor profiles
- Send messages to tutors per session

### 🧑‍🏫 Tutors
- Receive and manage session requests
- Accept or reject session requests
- View upcoming schedules
- Reply to student messages per session

### 💬 Messaging System
- One-to-one chat per session (text & files)
- Messages are stored in MySQL database
- No WebSocket: messages are fetched via API polling

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ **React.js** (Vite)
- 💨 **Tailwind CSS**
- 🔐 **Firebase Authentication**
- 🗂️ Context API + React Hooks
- 🌐 Deployed on **Vercel**

### Backend
- ☕ **Spring Boot** (Java)
- 🧩 RESTful APIs for all features
- 🗃️ **MySQL** (Hosted on Railway)
- 📁 File upload handling
- 🌐 Deployed on **Render**

---

## 📁 Project Structure (Frontend)

```
p2p-tutoring/
├── public/
├── src/
│   ├── assets/        # Images, icons, static files
│   ├── components/    # Reusable UI components
│   ├── layout/        # Shared layout wrappers (Navbar, Footer, etc.)
│   ├── modals/        # Modal components (EditModal, DeleteModal, etc.)
│   ├── pages/         # Route-based pages
│   ├── services/      # API and data-fetching logic
│   ├── utils/         # Helper functions
│   └── App.jsx        # Main App component
├── .env               # Environment variables
└── vite.config.js     # Vite configuration
```

---

## 🌐 Environment Variables

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=https://your-render-backend.onrender.com/api
or
VITE_API_BASE_URL=http://localhost:{port}//dbname
```

## ⚙️ How to Run Locally
### 📦 Prerequisites
- Node.js 18+
- Java 17+
- MySQL DB (or Railway instance)
- Springboot api

### 🔧 Frontend Setup
```bash
git clone https://github.com/james-paul25/p2p-tutoring.git
cd p2p-tutoring
npm install
npm run dev
```
### 🔧 Backend Setup (Spring Boot)
```application:properties
spring.datasource.url=jdbc:mysql://<host>:<port>/<db_name>
spring.datasource.username=your_db_user
spring.datasource.password=your_db_pass

spring.jpa.hibernate.ddl-auto=update
```
- run the backend app
```bash
./mvnw spring-boot:run
```
## 👨‍💻 Author
- James Paul
- [![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/friyayy404)
- [![GitHub](https://img.shields.io/badge/GitHub-000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/james-paul25)

## Made with ❤️ as a student project for BISU – Bohol Island State University
- Disclaimer: This project is for our final completion in the subject of Software Engineering and Information Management(MySql)
- 🔗 **Live Demo** [https://bisu-p2p-tutoring.vercel.app/](https://github.com/james-paul25/)
- Use this account for demo to save storage hahaha
- Email: japjap@bisu.edu.ph
- Password: japjap

