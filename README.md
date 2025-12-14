# 🍬 TDD Kata: Sweet Shop Management System

A full-stack **Sweet Shop Management System** built to manage real-world shop operations.  
This project demonstrates RESTful API development, authentication, inventory management, frontend SPA design, Test-Driven Development principles, and transparent AI usage.

🌐 **Live Demo**  
👉 https://sweet-shop-management-system-mauve.vercel.app

---

## 🎯 Objective

The goal of this kata is to design, build, and test a complete Sweet Shop Management System while showcasing:
- Backend API development
- Secure authentication
- Database-backed inventory management
- Frontend implementation using a modern framework
- Test-driven thinking
- Responsible and transparent use of AI tools

---

## 🚀 Overview

The system supports two roles:

- **Admin**: Manages sweets inventory (add, update, restock, delete)
- **User**: Browses sweets, searches with filters, adds to cart, and purchases items

The application features a clean UI, responsive layout, smooth animations, and dark/light mode support.

---

## 🧠 Tech Stack

### 🖥️ Frontend
- React.js
- React Router
- JavaScript (ES6+)
- Custom CSS
- Responsive Design
- Dark / Light Theme
- CSS Animations & Transitions

### 🛠️ Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcrypt for password hashing

### ☁️ Deployment
- Vercel (Frontend)
- Render (Backend)

---

## 🧪 Test-Driven Development (TDD)

This project follows the **Red → Green → Refactor** approach.

### Approach
- Tests are written to define expected behavior before or alongside feature development
- Core business logic is validated using automated tests
- Refactoring is performed after tests pass

### Covered Areas
- Authentication flows
- Sweet CRUD operations
- Inventory purchase and restock logic
- Authorization and role-based access control

Tests focus on validating **business logic and edge cases**, not just happy paths.

---

## 🧪 Testing & Test Report

### Tools
- Jest
- Supertest

### Run Backend Tests
```bash
cd backend
npm install
npm test
```

Tests focus on validating **business logic and edge cases**, not just happy paths.

---

## 🤖 My AI Usage

AI tools were used as development assistants while ensuring all final logic, decisions, and implementations were done manually.

### 🔧 AI Tools Used
- **ChatGPT** – for requirement clarification, logic validation, and documentation refinement
- **GitHub Copilot** – for inline suggestions and reducing repetitive boilerplate code

### 🧠 How I Used AI
- Used ChatGPT to brainstorm API endpoint structures and application flow
- Used ChatGPT to understand and validate TDD practices and edge cases
- Used GitHub Copilot to accelerate repetitive patterns such as CRUD handlers and test scaffolding
- Reviewed, modified, and finalized all AI-assisted code manually

### 🪞 Reflection on AI Impact
AI improved development efficiency and helped reduce time spent on boilerplate tasks.  
It allowed greater focus on system design, business logic, and UI quality.  
Core problem-solving, debugging, and architectural decisions were made independently to ensure correctness and learning integrity.

---

## 📸 Project Screenshots

Below are real screenshots showcasing admin and user workflows, inventory management, dark/light modes, and cart functionality.

### 🏠 Landing Page
<img src="https://github.com/user-attachments/assets/42dd18af-8f20-4e37-9e87-35cb8736f7f1" alt="Landing Page" width="100%" />

### 🔐 Authentication
<img src="https://github.com/user-attachments/assets/81407f06-de35-4bff-8b20-ef21ad6b0042" alt="Register Page" width="100%" />
<img src="https://github.com/user-attachments/assets/ca1185ea-620a-43f0-8d44-cb73820af8a5" alt="Login Page" width="100%" />

### 🛠 Admin Dashboard & Inventory
<img src="https://github.com/user-attachments/assets/33fc12a7-8427-45da-a25c-c0259defb5f0" alt="Admin Dashboard" width="100%" />
<img src="https://github.com/user-attachments/assets/c1db1077-963e-4ba5-8c06-07ed1554b335" alt="Admin Inventory Table" width="100%" />

### 🌙 Admin Dark Mode
<img src="https://github.com/user-attachments/assets/d239f60c-f9cf-4b60-b1f5-8c8706c69de7" alt="Admin Dark Mode" width="100%" />
<img src="https://github.com/user-attachments/assets/a3d3de1f-f4c6-4845-9c53-c9ac18f103cd" alt="Admin Dark Mode Filters" width="100%" />

### 🧑‍💻 User Dashboard
<img src="https://github.com/user-attachments/assets/3e9b4ef8-74e5-4118-8180-c6461c558687" alt="User Dashboard" width="100%" />

### 🛒 Cart & Checkout
<img src="https://github.com/user-attachments/assets/c0ebcb4c-58cd-4eaf-87e6-78ee4ba0b8ae" alt="User Cart" width="100%" />

---

## 👥 User Roles

### 🔐 Admin
Admins have full control over shop inventory:
- Add new sweets
- Update sweet details
- Restock inventory
- Delete sweets
- View real-time inventory status

### 🛒 User
Users enjoy a seamless shopping experience:
- Search sweets with multiple filters
- Add items to cart
- Increase or decrease quantities
- View total cart value in real time
- Purchase directly or via cart

---

## 🧩 Application Flow

1. User or Admin registers or logs in
2. System identifies role automatically
3. Admin manages sweets inventory
4. Users browse and filter sweets
5. Items added to cart or purchased directly
6. Total price updates in real time
7. Checkout completes the order

---

## 🛠️ Local Setup Instructions
### Backend
```bash
cd backend
npm install
npm run dev
```

## Create a .env file:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

### Frontend
```bash
cd frontend
npm install
npm start
```

---

## 🎯 Why This Project Stands Out

- Real-world shop workflow implementation
- Clean and modern UI design
- Role-based access control
- Scalable backend architecture
- Responsive across all devices
- Test-driven development approach

---

## 📌 Future Enhancements

- Order history and invoice generation
- Sales analytics dashboard
- Order tracking system
- Low-stock notifications
- Online payment gateway integration

---

## 👨‍💻 Author

**Sachin**  
Software Engineer passionate about building clean, scalable web applications with strong backend logic and modern UI design.

---

⭐ If you like this project, consider giving it a star on GitHub. It really helps and means a lot.
