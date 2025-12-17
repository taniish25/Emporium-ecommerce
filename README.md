# MERN E-Commerce Platform

A full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- 🛍️ Product catalog with search and filtering
- 🛒 Shopping cart functionality
- 👤 User authentication and profiles
- 📱 Responsive design with mobile support
- 🌙 Dark/Light mode toggle
- 🔐 Admin panel for product management
- 💳 Secure checkout process
- 📦 Order history tracking

## Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- React Router
- Heroicons
- Context API for state management

**Backend:**
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcrypt for password hashing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/mern-ecommerce.git
cd mern-ecommerce
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Create environment variables
Create a `.env` file in the backend directory:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

5. Start the development servers

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
mern-ecommerce/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
└── README.md
```

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.