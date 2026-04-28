# 🔐 Security Web Application

## 📌 Overview

This is a Node.js and Express-based web application that implements basic security features including input validation, password hashing, authentication, and secure HTTP headers.

---

## ⚙️ Features

* User Registration with validation
* Secure password hashing using bcrypt
* User Login with JWT authentication
* Protected Dashboard route
* HTTP security using Helmet

---

## 🛠️ Technologies Used

* Node.js
* Express.js
* Validator
* Bcrypt
* JSON Web Token (JWT)
* Helmet

---

## 📁 Project Structure

```
secure-app/
│── server.js
│── package.json
│
├── public/
│   ├── index.html
│   ├── login.html
│   ├── dashboard.html
│   ├── register.js
│   ├── login.js
│   ├── dashboard.js
│   ├── style.css
```

---

## 🚀 Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/Taha18a/secure-app.git
cd secure-app
```

### 2. Install dependencies

```
npm install
```

### 3. Run the server

```
npm start
```

Server will run at:

```
http://localhost:3000
```

---

## 🔐 API Endpoints

### Register

POST `/register`

```
{
  "email": "user@example.com",
  "password": "123456"
}
```

### Login

POST `/login`

Returns JWT token

### Dashboard (Protected)

GET `/dashboard`

Requires:

```
Authorization: Bearer <token>
```

---

## 🔒 Security Implementation

* Input validation using validator
* Password hashing using bcrypt
* JWT authentication for protected routes
* Helmet for securing HTTP headers





