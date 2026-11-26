# Expense Tracker – MERN Stack Application

## 🌐 Live Demo

**[Visit Expense Tracker Application](https://expense-tracker-bw0f.onrender.com/)**

## 📌 Project Overview

The **Expense Tracker** is a full-stack web application developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js) to help users manage and track their personal finances efficiently.

The application allows users to manage their income and expenses, monitor financial activities, and gain insights into their spending habits through interactive dashboards and visual charts.

It provides secure user authentication, persistent data storage, and RESTful APIs for seamless financial data management.

## 🚀 Key Features

- **User Authentication:** Secure user registration and login using JWT authentication.
- **Income Management:** Add, update, view, and delete income records.
- **Expense Management:** Track and manage daily expenses.
- **CRUD Operations:** Perform Create, Read, Update, and Delete operations through RESTful APIs.
- **Financial Dashboard:** View income, expenses, and overall financial summaries.
- **Daily, Monthly & Yearly Summaries:** Analyze financial activities across different time periods.
- **Income vs Expense Analysis:** Compare income and expenses through dashboard visualizations.
- **Interactive Charts:** Visual representation of financial data for better understanding.
- **Category-wise Analysis:** Monitor spending patterns based on expense categories.
- **Persistent Data Storage:** Store financial records securely in MongoDB.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| MongoDB | NoSQL database |
| Express.js | Backend web framework |
| React.js | Frontend development |
| Node.js | Server-side JavaScript runtime |
| JWT | Authentication and authorization |
| REST API | Client-server communication |

## 🏗️ Application Architecture

The application follows the MERN stack architecture:

1. **Frontend (React.js):** Provides the user interface and interactive financial dashboard.
2. **Backend (Node.js & Express.js):** Handles business logic and RESTful API requests.
3. **Database (MongoDB):** Stores user information and financial transaction records.
4. **Authentication (JWT):** Secures API endpoints and manages authenticated user access.

## ⚙️ Installation and Setup

Follow these steps to run the project locally.

### Prerequisites

- Node.js
- npm
- MongoDB
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/chaitalip32/Expense-Tracker.git
```

### 2. Navigate to the Project Directory

```bash
cd server
```

### 3. Install Dependencies

Install backend dependencies:

```bash
npm install
```

Install frontend dependencies:

```bash
cd client
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the backend directory and configure the required environment variables.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Use the actual variable names expected by your application. Never commit real credentials or secrets to GitHub.

### 5. Run the Application

Start the backend server:

```bash
npm run dev
```

Start the frontend in a separate terminal:

```bash
cd client
npm start
```

The frontend and backend commands may vary depending on the scripts configured in `package.json`.

## 📊 Financial Insights

The application provides financial insights through:

- Daily income and expense summaries.
- Monthly financial reports.
- Yearly financial summaries.
- Income vs expense comparisons.
- Category-wise expense visualizations.
- Interactive charts for understanding spending patterns.

## 🔒 Security

- JWT-based user authentication.
- Protected API endpoints.
- Token-based authorization.
- Secure handling of application configuration through environment variables.

## 🎯 Project Objectives

- Simplify personal finance management.
- Help users track income and expenses.
- Provide meaningful financial insights.
- Visualize spending patterns through interactive charts.
- Maintain secure and persistent financial records.
- Develop practical full-stack application development skills using the MERN stack.

## 👩‍💻 Developer

**Chaitali Pednekar**

- GitHub: [chaitalip32](https://github.com/chaitalip32)

## 📅 Project Duration

October 2025 – November 2025