# REST API with Node.js, Express, and Mongoose

A fully functional REST API for managing users with Create, Read, Update, and Delete (CRUD) operations using Node.js, Express, and MongoDB with Mongoose.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Testing with Postman](#testing-with-postman)
- [Project Details](#project-details)

## ✨ Features

- **GET** - Retrieve all users from the database
- **POST** - Create and add a new user to the database
- **PUT** - Edit/update an existing user by ID
- **DELETE** - Remove a user from the database by ID
- **Validation** - Input validation for user data
- **Error Handling** - Comprehensive error responses
- **Timestamps** - Automatic creation and update timestamps
- **Environment Variables** - Secure configuration with dotenv
- **MongoDB Atlas** - Cloud database support

## 📁 Project Structure

```
rest_api-project/
├── config/
│   └── .env                 # Environment variables
├── models/
│   └── User.js             # Mongoose User schema
├── server.js               # Express server and routes
├── package.json            # Project dependencies
├── package-lock.json       # Locked versions
└── README.md              # Project documentation
```

## 📦 Prerequisites

- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **MongoDB Atlas Account** (for cloud database) OR local MongoDB installation
- **Postman** (for testing API endpoints)

## 🔧 Installation

1. **Clone or navigate to the project directory:**
   ```powershell
   cd rest_api-project
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```

   This will install:
   - `express` - Web framework for Node.js
   - `mongoose` - MongoDB object modeling
   - `dotenv` - Environment variable management

## ⚙️ Configuration

1. **Update the `.env` file** in the `config` folder with your MongoDB connection string:

   ```env
   # Database Configuration
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxx.mongodb.net/rest_api_db

   # Server Configuration
   PORT=5000
   NODE_ENV=development
   ```

   **For MongoDB Atlas:**
   - Get your connection string from your MongoDB Atlas cluster
   - Replace `username` and `password` with your credentials
   - Add `/rest_api_db` at the end for the database name

   **For Local MongoDB:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/rest_api_db
   ```

## 🚀 Running the Server

Start the server with the following command:

```powershell
npm start
```

You should see output like:
```
[dotenv] injecting env (3) from config/.env
Server is running on port 5000
Environment: development
MongoDB connected successfully!
```

The server will be available at `http://localhost:5000`

## 📡 API Endpoints

### 1. GET - Retrieve All Users

**Endpoint:** `GET /api/users`

**Description:** Retrieve all users from the database

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "age": 25,
      "phone": "1234567890",
      "city": "New York",
      "createdAt": "2025-12-02T10:00:00.000Z",
      "updatedAt": "2025-12-02T10:00:00.000Z"
    }
  ]
}
```

---

### 2. POST - Create a New User

**Endpoint:** `POST /api/users`

**Description:** Create and add a new user to the database

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25,
  "phone": "1234567890",
  "city": "New York"
}
```

**Required Fields:**
- `name` (string) - User's full name (minimum 2 characters)
- `email` (string) - User's email address (must be unique and valid format)

**Optional Fields:**
- `age` (number) - User's age (0-150)
- `phone` (string) - User's phone number
- `city` (string) - User's city

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "phone": "1234567890",
    "city": "New York",
    "createdAt": "2025-12-02T10:00:00.000Z",
    "updatedAt": "2025-12-02T10:00:00.000Z"
  }
}
```

---

### 3. PUT - Update a User by ID

**Endpoint:** `PUT /api/users/:id`

**Description:** Edit/update an existing user by their ID

**URL Parameter:**
- `id` - User's MongoDB ID

**Request Body (any fields to update):**
```json
{
  "name": "Jane Doe",
  "age": 26,
  "city": "Los Angeles"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Jane Doe",
    "email": "john@example.com",
    "age": 26,
    "phone": "1234567890",
    "city": "Los Angeles",
    "createdAt": "2025-12-02T10:00:00.000Z",
    "updatedAt": "2025-12-02T10:15:00.000Z"
  }
}
```

---

### 4. DELETE - Remove a User by ID

**Endpoint:** `DELETE /api/users/:id`

**Description:** Remove a user from the database by their ID

**URL Parameter:**
- `id` - User's MongoDB ID

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "phone": "1234567890",
    "city": "New York",
    "createdAt": "2025-12-02T10:00:00.000Z",
    "updatedAt": "2025-12-02T10:00:00.000Z"
  }
}
```

---

## 🧪 Testing with Postman

### Step 1: Create a New User (POST)

1. Open Postman
2. Set method to **POST**
3. Enter URL: `http://localhost:5000/api/users`
4. Go to **Body** tab → select **raw** → select **JSON**
5. Paste the following:
   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "age": 25,
     "phone": "1234567890",
     "city": "New York"
   }
   ```
6. Click **Send**
7. Copy the `_id` from the response for later use

### Step 2: Get All Users (GET)

1. Set method to **GET**
2. Enter URL: `http://localhost:5000/api/users`
3. Click **Send**
4. You should see all users in the database

### Step 3: Update a User (PUT)

1. Set method to **PUT**
2. Enter URL: `http://localhost:5000/api/users/{USER_ID}` (replace with actual ID)
3. Go to **Body** tab → select **raw** → select **JSON**
4. Paste:
   ```json
   {
     "name": "Jane Doe",
     "age": 26
   }
   ```
5. Click **Send**

### Step 4: Delete a User (DELETE)

1. Set method to **DELETE**
2. Enter URL: `http://localhost:5000/api/users/{USER_ID}` (replace with actual ID)
3. Click **Send**
4. The user should be removed from the database

---

## 📚 Project Details

### User Schema (Mongoose)

The User model has the following fields:

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| `name` | String | Yes | Minimum 2 characters |
| `email` | String | Yes | Valid email format, unique |
| `age` | Number | No | Between 0-150 |
| `phone` | String | No | None |
| `city` | String | No | None |
| `createdAt` | Date | Auto | Timestamp on creation |
| `updatedAt` | Date | Auto | Timestamp on update |

### Technologies Used

- **Express.js** - Web application framework
- **Mongoose** - MongoDB object modeling
- **dotenv** - Environment variable management
- **Node.js** - JavaScript runtime environment
- **MongoDB Atlas** - Cloud database service

### Error Handling

The API includes comprehensive error handling:

- **400 Bad Request** - Invalid data or validation errors
- **404 Not Found** - User not found
- **500 Internal Server Error** - Server-side errors
- **Duplicate Email** - Returns 400 with duplicate email error

---

## 📝 Notes

- All code is fully commented for easy understanding
- The API returns JSON responses with `success` and `message` fields
- Timestamps are automatically managed by Mongoose
- Email validation ensures proper email format
- All user IDs are MongoDB ObjectIds

---

## 🤝 Support

For issues or questions, check:
- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com/)
- [Postman Documentation](https://learning.postman.com/)

---

**Created:** December 2, 2025

**Status:** ✅ Ready for Production
