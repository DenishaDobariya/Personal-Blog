# Personal Blog App
- This is a full-stack personal blog application built with a React frontend and a Node.js/Express backend. The app allows users to create, update, delete, and view blog posts.

## Features
- User authentication (registration, login)
- Create, read, update, and delete posts
- Image upload functionality
- Responsive design

## Prerequisites
**Before you begin, ensure you have the following installed:**

- Node.js: Download and install from Node.js Official Website.
- MongoDB: Make sure MongoDB is installed and running on your machine or use a cloud MongoDB service like MongoDB Atlas.
- npm or yarn: Comes with Node.js installation.

## Installation Instructions
1.**Clone the repository and go to directory**

       cd personal-blog-app

2.**Set up the backend** 

- Navigate to the backend folder:

      cd backend
  
- Install dependencies:

      npm install
  
- Create a .env file in the backend directory with the following variables:

      
      MONGO_URL=<your-mongodb-connection-string>
      PORT=<backend-server-port> # Example: 5000
      SECRET=<your-jwt-secret-key>
  
3.**Start the backend server:**

- If you face an error while starting the server, install nodemon:
  
      npm install nodemon
  
- Then start the server using one of the following commands:

      npm run dev        # If using nodemon
      npx nodemon        # Alternative nodemon start
      npm start          # Without nodemon

4.**Set up the frontend

- Navigate to the frontend folder:

      cd ../frontend
  
- Install dependencies:

      npm install
  
- Create a .env file in the frontend directory with the following variables:

      VITE_URL=<backend-url>          # Example: http://localhost:5000
      VITE_IF=<backend-images-url>    # Example: http://localhost:5000/images/

5.**Start the frontend development server:**

      npm run dev


6.**Open your browser and go to http://localhost:5000 to view the app.**

## Usage

- Register or login to start creating blog posts.
- Use the editor to write posts and upload images.
- View, edit, or delete your posts at any time.


## Dependencies

**Backend**
- Express: Web framework
- Mongoose: MongoDB object modeling
- bcrypt: Password hashing
- jsonwebtoken: User authentication
- multer: File uploads
  
**Frontend**
- React: UI framework
- Axios: HTTP client
- React Router: Routing library


## Troubleshooting

- Backend server not starting: Ensure you have installed nodemon and try starting the server using npm run dev or npx nodemon.
- MongoDB connection error: Double-check your MONGO_URL in the .env file and ensure MongoDB is running.
- CORS issues: Make sure your frontend VITE_URL matches the backend URL exactly (including the port).





  
