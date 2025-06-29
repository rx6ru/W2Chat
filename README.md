# W2Chat - Real-time Chat Application

W2Chat is a simple full-stack real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.IO.

## Features

*   **User Authentication:** Secure user registration and login with JWT authentication.
*   **Real-time Messaging:** Instant messaging between users with Socket.IO.
*   **Online Status:** See which users are currently online.
*   **User Profiles:** View and update your user profile, including profile pictures hosted on Cloudinary.
*   **Theme Switching:** Customize the look and feel of the application with theme switching.

## Tech Stack

### Backend

*   **Framework:** Express.js
*   **Database:** MongoDB (with Mongoose)
*   **Authentication:** JWT (JSON Web Tokens)
*   **Real-time Communication:** Socket.IO
*   **Image Storage:** Cloudinary
*   **Other Libraries:** bcryptjs, cookie-parser, cors, dotenv, morgan, zod

### Frontend

*   **Framework:** React
*   **State Management:** Zustand
*   **Routing:** React Router
*   **Styling:** Tailwind CSS with DaisyUI
*   **API Communication:** Axios
*   **Other Libraries:** lucide-react, react-hot-toast, socket.io-client

## Getting Started

### Prerequisites

*   Node.js (v14 or later)
*   MongoDB
*   Cloudinary account

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/w2chat.git
    cd w2chat
    ```

2.  **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Install frontend dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

4.  **Create a `.env` file in the `backend` directory and add the following environment variables:**

    ```
    PORT=3000
    MONGODB_URI=<your_mongodb_uri>
    JWT_SECRET=<your_jwt_secret>
    CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
    CLOUDINARY_API_KEY=<your_cloudinary_api_key>
    CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
    NODE_ENV=development
    ```

> **Note:**  
> Make sure `NODE_ENV` is set to `development` in your `.env` file when running locally. This ensures cookies and other settings work correctly for development. 

> ###  For production, don't add it to your `.env`.

### Running the Application

1.  **Start the backend server:**

    ```bash
    cd backend
    npm run dev
    ```

2.  **Start the frontend development server:**

    ```bash
    cd ../frontend
    npm run dev
    ```

The application will be available at `http://localhost:5173`.