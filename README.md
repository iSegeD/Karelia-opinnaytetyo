MERNBLOG

MERNBLOG is a full-stack blog application developed as part of my Bachelor’s thesis.

The application allows users to create accounts, manage profiles, publish and edit blog posts, upload images, leave comments, and interact with content. The backend provides a REST API responsible for authentication, data validation, database operations, image processing, and file storage.

⚙️ Backend

The backend is built with Node.js, Express, and MongoDB.

🛠️ Technologies Used
🟢 Node.js — backend JavaScript runtime
🚂 Express 5 — REST API, routing, and middleware
🍃 MongoDB & Mongoose — database, schemas, models, and queries
🔐 JSON Web Token — access and refresh token authentication
🔒 bcrypt — secure password hashing
🍪 cookie-parser — HTTP-only refresh token cookies
✅ express-validator — request validation and sanitization
📤 Multer — image upload handling
🖼️ Sharp — image resizing and optimization
☁️ Google Cloud Storage — storage for profile and blog post images
🆔 UUID — generation of unique identifiers
🔧 dotenv — environment variable configuration
♻️ Nodemon — automatic server restart during development
🌍 cross-env — cross-platform environment configuration


🔑 Backend Features: 
- User registration and login
- Access and refresh token authentication
- Secure password storage
- Protected API routes
- User profile management
- Blog post CRUD operations
- Comment functionality
- Image upload and processing
- Request validation
- Centralized error handling
- MongoDB data persistence
