# 🏗️ Const_AWS – Construction Management Platform on AWS

Const_AWS** is a cloud-based full-stack Construction Management System designed to streamline site operations and enhance collaboration between engineers, contractors, and workers. Built as a **database-driven web application**, the platform provides role-based dashboards, blueprint annotations, task tracking, and inventory management — all integrated into a robust, scalable cloud architecture.

This project is **deployed entirely on AWS Cloud**, utilizing:

- ☁️ **EC2** for hosting the backend server  
- ☁️ **S3** for storing blueprints and digital assets  
- ☁️ **RDS / MongoDB Atlas** as the cloud database solution  
- ☁️ **CloudWatch** for logging and monitoring  
- ☁️ **Route 53 with SSL** for secure custom domain hosting  

##  Features

###  Role-Based Access Control (RBAC)
- Separate interfaces for Engineers, Contractors, and Workers.
- Secure login & session handling.
- <img width="1411" alt="Screenshot 2025-06-16 at 10 06 51 PM" src="https://github.com/user-attachments/assets/2e284d0b-1078-49d5-9347-930f11c1e1f0" />


###  Blueprint Annotation
- Upload and annotate architectural blueprints.
- Pin tasks, comments, and materials directly on site plans.
- <img width="1415" alt="Screenshot 2025-06-16 at 10 07 26 PM" src="https://github.com/user-attachments/assets/6157fa6f-88d9-4be1-bf0e-a091e36f2f3d" />


###  Task & Project Tracking
- Assign tasks to teams or individuals.
- Visual project progress updates with Gantt-style tracking.
- <img width="1417" alt="Screenshot 2025-06-16 at 10 07 51 PM" src="https://github.com/user-attachments/assets/96ad1775-c3a8-41ab-929f-28e810310c88" />


###  Inventory Management
- Track materials, orders, and deliveries.
- Low-stock alerts and material usage logs.

###  AI-Powered RAG Chatbot *(Coming Soon)*
- Query construction standards, safety guidelines, and project-specific data using a Retrieval-Augmented Generation (RAG) chatbot powered by LangChain & Gemini.

---

## 🛠️ Tech Stack

| Layer       | Tech Used                            |
|-------------|--------------------------------------|
|Cloud       | AWS EC2, S3, RDS / MongoDB Atlas      |
| Frontend    | React.js, Tailwind CSS               |
| Backend     | Node.js, Express.js                  |
| Database    | MongoDB (with Mongoose)              |
| Authentication | JWT, Bcrypt                       |
| DevOps      | GitHub Actions, NGINX, PM2           |
| AI Features | LangChain, Gemini API *(planned)*    |

---

## 📁 Project Structure
Const_AWS/
├── client/              # React Frontend
├── server/              # Node/Express Backend
├── .env.example         # Sample environment config
├── Dockerfile           # For containerization (optional)
└── README.md
