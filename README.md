# NetworQ 🌐

> A modern LinkedIn-inspired professional networking platform built with React and Node.js

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.0-blue.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🚀 Demo

**[Live Demo](https://your-demo-link.vercel.app)** | **[Backend API](https://your-api-link.railway.app)**

> Replace with your actual deployed links

## 📖 Overview

NetworQ is a professional networking platform that allows users to connect, share content, and build meaningful professional relationships. It features a clean, modern interface with robust authentication, real-time messaging, and comprehensive profile management.

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based login/register with persistent sessions
- 👤 **Professional Profiles** - Comprehensive user profiles with work experience
- 📝 **Content Sharing** - Create and share professional posts and updates  
- 🤝 **Networking** - Send and manage connection requests
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile


## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library with hooks and modern patterns
- **React Router DOM** - Client-side routing and navigation
- **Tailwind CSS** - Utility-first CSS framework
- **React Hot Toast** - Beautiful notifications
- **Axios** - HTTP client for API requests
- **React Icons** - Comprehensive icon library

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling for Node.js
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing and security
- **Multer** - File upload handling
- **Socket.io** - Real-time bidirectional communication

### Development & Deployment
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and quality assurance
- **Prettier** - Code formatting
- **Vercel** - Frontend hosting and deployment
- **Railway/Render** - Backend hosting and deployment

## 📁 Project Structure

networq/
├── frontend/ # React frontend application
│ ├── public/ # Static assets
│ │ ├── favicon.ico
│ │ └── index.html
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ │ ├── common/ # Shared components
│ │ │ │ ├── Button.jsx
│ │ │ │ ├── Input.jsx
│ │ │ │ └── Modal.jsx
│ │ │ ├── layout/ # Layout components
│ │ │ │ ├── Navbar.jsx
│ │ │ │ └── Footer.jsx
│ │ │ └── feed/ # Feed-related components
│ │ │ ├── Post.jsx
│ │ │ ├── CreatePost.jsx
│ │ │ └── PostList.jsx
│ │ ├── pages/ # Page components
│ │ │ ├── Home.jsx
│ │ │ ├── Login.jsx
│ │ │ ├── Register.jsx
│ │ │ ├── Profile.jsx
│ │ │ ├── Messages.jsx
│ │ │ └── Connections.jsx
│ │ ├── context/ # React context providers
│ │ │ ├── AuthContext.jsx
│ │ │ └── ThemeContext.jsx
│ │ ├── hooks/ # Custom React hooks
│ │ │ ├── useAuth.js
│ │ │ └── useSocket.js
│ │ ├── utils/ # Utility functions
│ │ │ ├── api.js
│ │ │ ├── constants.js
│ │ │ └── helpers.js
│ │ ├── styles/ # Global styles
│ │ │ └── index.css
│ │ └── App.jsx # Main application component
│ ├── package.json
│ ├── tailwind.config.js
│ └── vite.config.js
│
├── backend/ # Node.js backend API
│ ├── src/
│ │ ├── controllers/ # Route controllers
│ │ │ ├── authController.js
│ │ │ ├── userController.js
│ │ │ ├── postController.js
│ │ │ └── connectionController.js
│ │ ├── models/ # Database models
│ │ │ ├── User.js
│ │ │ ├── Post.js
│ │ │ ├── Connection.js
│ │ │ └── Message.js
│ │ ├── routes/ # API routes
│ │ │ ├── auth.js
│ │ │ ├── users.js
│ │ │ ├── posts.js
│ │ │ └── connections.js
│ │ ├── middleware/ # Custom middleware
│ │ │ ├── auth.js
│ │ │ ├── validation.js
│ │ │ └── upload.js
│ │ ├── utils/ # Backend utilities
│ │ │ ├── database.js
│ │ │ ├── jwt.js
│ │ │ └── email.js
│ │ └── app.js # Express app configuration
│ ├── package.json
│ └── server.js # Server entry point
│
├── README.md
├── .gitignore
└── LICENSE

text

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)

### Installation

1. **Clone the repository**
git clone https://github.com/Kailramiya/networq.git
cd networq

text

2. **Setup Backend**
cd backend
npm install

Create environment variables
cp .env.example .env

Edit .env with your configuration:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/networq
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
Start development server
npm run dev

text

3. **Setup Frontend**
cd frontend
npm install

Create environment variables
cp .env.example .env

Edit .env with your configuration:
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
Start development server
npm run dev

text

4. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

### Alternative Setup with Docker

Run with Docker Compose
docker-compose up --build

The app will be available at:
Frontend: http://localhost:3000
Backend: http://localhost:5000
text

## 📱 Usage

### Creating an Account
1. Navigate to `/register`
2. Fill in your professional details
3. Verify your email address
4. Complete your profile setup



### Sharing Content
1. Create posts about your professional journey
2. Share industry insights and updates
3. Engage with your network's content
4. Build your professional brand

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
Server Configuration
PORT=5000
NODE_ENV=development

Database
MONGODB_URI=mongodb://localhost:27017/networq

Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

File Upload (Cloudinary)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

Email Service (Optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

text

#### Frontend (.env)
API Configuration
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000

App Configuration
VITE_APP_NAME=NetworQ
VITE_APP_VERSION=1.0.0

text

## 🧪 Testing

Run backend tests
cd backend
npm test

Run frontend tests
cd frontend
npm test

Run end-to-end tests
npm run test:e2e

text

## 📦 Building for Production

### Frontend
cd frontend
npm run dev

text

### Backend
cd backend
npm run dev

text

## 🚢 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Railway)
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard  
3. Deploy automatically on push to main branch





1. **Fork the repository**
2. **Create your feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

## 🐛 Bug Reports & Feature Requests

Please use the [GitHub Issues](https://github.com/Kailramiya/networq/issues) tab to report bugs or request features.

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/check` - Verify JWT token
- `POST /api/auth/logout` - User logout

### User Endpoints  
- `GET /api/users/profile/:id` - Get user profile
- `GET /api/users/profile/:id` - Get posts by User

### Posts Endpoints
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post

For complete API documentation, visit `/api/docs` when running the backend.

## 🔒 Security

- **JWT Authentication** with secure token storage
- **Password Hashing** using bcryptjs
- **Input Validation** and sanitization
- **CORS** configuration for cross-origin requests
- **Rate Limiting** to prevent abuse



## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Kailramiya** - [@Kailramiya](https://github.com/Kailramiya)
**Mail**-[@Mail](officialamankundu@gmail.com)



---

**⭐ Star this repository if you found it helpful!**

For support, email kailramiya@example.com or join our [Discord community](https://discord.gg/networq).
