# MERNBLOG

**MERNBLOG** is a full-stack blog application developed as part of my Bachelor’s thesis.

The application allows users to create accounts, manage profiles, publish and edit blog posts, upload images, leave comments, and interact with content. The backend provides a REST API responsible for authentication, data validation, database operations, image processing, and file storage.

## ⚙️ Backend

The backend is built with **Node.js**, **Express**, and **MongoDB**.

### 🛠️ Technologies Used

* 🟢 **Node.js** — backend JavaScript runtime
* 🚂 **Express 5** — REST API, routing, and middleware
* 🍃 **MongoDB & Mongoose** — database, schemas, models, and queries
* 🔐 **JSON Web Token** — access and refresh token authentication
* 🔒 **bcrypt** — secure password hashing
* 🍪 **cookie-parser** — HTTP-only refresh token cookies
* ✅ **express-validator** — request validation and sanitization
* 📤 **Multer** — image upload handling
* 🖼️ **Sharp** — image resizing and optimization
* ☁️ **Google Cloud Storage** — storage for profile and blog post images
* 🆔 **UUID** — generation of unique identifiers
* 🔧 **dotenv** — environment variable configuration
* ♻️ **Nodemon** — automatic server restart during development
* 🌍 **cross-env** — cross-platform environment configuration

### 🔑 Backend Features

* User registration and login
* Access and refresh token authentication
* Secure password storage
* Protected API routes
* User profile management
* Blog post CRUD operations
* Comment functionality
* Image upload and processing
* Request validation
* Centralized error handling
* MongoDB data persistence





## 🎨 Frontend

The frontend is built with **React**, **Vite**, and **Tailwind CSS**. It provides a responsive user interface for authentication, profile management, blog post creation, comments, and content browsing.

### 🛠️ Technologies Used

* ⚛️ **React 19** — component-based user interface
* ⚡ **Vite** — development server and production build tool
* 🧭 **React Router** — client-side routing and navigation
* 🗃️ **Redux Toolkit** — global application and authentication state management
* 🔗 **React Redux** — integration between React and the Redux store
* 🌐 **Axios** — communication with the backend REST API
* 🎨 **Tailwind CSS** — responsive styling and user interface design
* 📝 **React Hook Form** — form state management and submission handling
* ✅ **Yup & Hook Form Resolvers** — form validation and validation schema integration
* ✍️ **React Quill** — rich text editor for creating blog posts
* 🔔 **React Toastify** — success and error notifications
* 🕒 **React Time Ago** — human-readable publication dates
* 🎭 **React Icons** — reusable interface icons
* 🧹 **ESLint** — code quality and consistency

### ✨ Frontend Features

* Responsive user interface
* User registration and login forms
* Profile management
* Blog post creation and editing
* Rich text content editor
* Post and profile image previews
* Comments and content interaction
* Client-side routing
* Global authentication state
* Form validation and error messages
* Success and error notifications



## 📌 Project Status

This project was developed and deployed as part of my Bachelor’s thesis. It is currently not actively maintained or hosted online.

Running the application requires configuring the necessary environment variables, MongoDB connection, authentication secrets, and cloud storage credentials.

The source code remains available as a demonstration of the application’s architecture, features, and technologies.



