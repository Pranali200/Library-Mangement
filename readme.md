
# Library Management System Backend

This is the backend for a Library Management System, which includes JWT-based authentication and role-based access control (RBAC). The system has two user roles: **LIBRARIAN** and **MEMBER**. The backend provides RESTful APIs for managing books, members, and borrowing/returning books.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Books](#books)
  - [Members](#members)
  - [Borrow/Return Books](#borrowreturn-books)
  - [History](#history)
- [Environment Variables](#environment-variables)
- [License](#license)

---

## Features

- JWT-based authentication.
- Role-based access control (RBAC) for **LIBRARIAN** and **MEMBER**.
- **LIBRARIAN** can manage books and members.
- **MEMBER** can borrow/return books and manage their own account.
- Complete book borrowing and return history tracking.

---

## Requirements

- Node.js (>= 14.x)
- MongoDB (Local or cloud-based MongoDB instance)

---

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/library-management-system-backend.git
    cd library-management-system-backend
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**: Create a `.env` file in the root directory with the following variables:

    ```bash
    MONGO_URI=mongodb://localhost:27017/library_system
    JWT_SECRET=your_jwt_secret_key
    ```

4. **Start the server**:

    ```bash
    npm start
    ```

    The server will start on `http://localhost:5000`.

---

## Usage

You can use Postman or any other API client to test the API. The server runs on `http://localhost:5000` by default.

For protected routes, you need to pass the JWT token in the Authorization header:

```bash
Authorization: Bearer <your-token-here>
```

---

## API Endpoints

### Authentication

1. **Signup**

   - **POST** `/api/auth/signup`
   - Request body:

     ```json
     {
       "username": "john_doe",
       "password": "password123",
       "role": "LIBRARIAN" // or "MEMBER"
     }
     ```

   - Response:

     ```json
     {
       "message": "User created successfully"
     }
     ```

2. **Login**

   - **POST** `/api/auth/login`
   - Request body:

     ```json
     {
       "username": "john_doe",
       "password": "password123"
     }
     ```

   - Response:

     ```json
     {
       "token": "your-jwt-token",
       "role": "LIBRARIAN" // or "MEMBER"
     }
     ```

---

### Books

1. **Add a Book (Librarian only)**

   - **POST** `/api/books`
   - Request body:

     ```json
     {
       "title": "The Great Gatsby",
       "author": "F. Scott Fitzgerald"
     }
     ```

   - Response:

     ```json
     {
       "message": "Book added successfully",
       "book": {
         "_id": "614b1f1a5f3c0b001f5d6234",
         "title": "The Great Gatsby",
         "author": "F. Scott Fitzgerald",
         "status": "AVAILABLE"
       }
     }
     ```

2. **Update a Book (Librarian only)**

   - **PUT** `/api/books/:id`
   - Request body:

     ```json
     {
       "title": "New Title",
       "author": "New Author"
     }
     ```

   - Response:

     ```json
     {
       "message": "Book updated successfully"
     }
     ```

3. **Delete a Book (Librarian only)**

   - **DELETE** `/api/books/:id`
   - Response:

     ```json
     {
       "message": "Book deleted successfully"
     }
     ```

4. **Get All Books**

   - **GET** `/api/books`
   - Response:

     ```json
     [
       {
         "_id": "614b1f1a5f3c0b001f5d6234",
         "title": "The Great Gatsby",
         "author": "F. Scott Fitzgerald",
         "status": "AVAILABLE"
       },
       {
         "_id": "614b1f1a5f3c0b001f5d6235",
         "title": "1984",
         "author": "George Orwell",
         "status": "BORROWED"
       }
     ]
     ```

---

### Members

1. **Add a Member (Librarian only)**

   - **POST** `/api/members`
   - Request body:

     ```json
     {
       "username": "john_doe",
       "password": "password123"
     }
     ```

   - Response:

     ```json
     {
       "message": "Member added successfully"
     }
     ```

2. **Update a Member (Librarian only)**

   - **PUT** `/api/members/:id`
   - Request body:

     ```json
     {
       "username": "john_updated",
       "password": "new_password123"
     }
     ```

   - Response:

     ```json
     {
       "message": "Member updated successfully"
     }
     ```

3. **Delete a Member (Librarian only)**

   - **DELETE** `/api/members/:id`
   - Response:

     ```json
     {
       "message": "Member deleted successfully"
     }
     ```

4. **Get All Members (Librarian only)**

   - **GET** `/api/members`
   - Response:

     ```json
     [
       {
         "_id": "614b1f1a5f3c0b001f5d6236",
         "username": "john_doe",
         "status": "ACTIVE"
       },
       {
         "_id": "614b1f1a5f3c0b001f5d6237",
         "username": "jane_doe",
         "status": "DELETED"
       }
     ]
     ```

---

### Borrow/Return Books

1. **Borrow a Book (Member only)**

   - **PUT** `/api/books/:id/borrow`
   - Request body:

     ```json
     {
       "userId": "614b1f1a5f3c0b001f5d6236"
     }
     ```

   - Response:

     ```json
     {
       "message": "Book borrowed successfully"
     }
     ```

2. **Return a Book (Member only)**

   - **PUT** `/api/books/:id/return`
   - Request body:

     ```json
     {
       "userId": "614b1f1a5f3c0b001f5d6236"
     }
     ```

   - Response:

     ```json
     {
       "message": "Book returned successfully"
     }
     ```

---

### History

1. **View Member History (Librarian and Member)**

   - **GET** `/api/members/:id/history`
   - Response:

     ```json
     [
       {
         "bookTitle": "The Great Gatsby",
         "borrowedDate": "2023-10-01T10:00:00.000Z",
         "returnedDate": "2023-10-05T14:00:00.000Z"
       },
       {
         "bookTitle": "1984",
         "borrowedDate": "2023-09-21T12:00:00.000Z",
         "returnedDate": null
       }
     ]
     ```

---

## Environment Variables

| Variable   | Description                    | Example Value                             |
|------------|--------------------------------|-------------------------------------------|
| `MONGO_URI` | MongoDB connection URI          | mongodb://localhost:27017/library_system  |
| `JWT_SECRET` | Secret key for JWT signing      | your_jwt_secret_key                       |

---

