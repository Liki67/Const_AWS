# 🏗️ Const_AWS – Construction Management Platform on AWS

Const_AWS is a full-stack Construction Site Management Platform deployed on Amazon Web Services (AWS). It streamlines operations for engineers, contractors, and workers through centralized dashboards, task management, blueprint annotations, inventory tracking, and real-time collaboration. The app is designed for scalability, security, and performance, leveraging cloud infrastructure and modern DevOps practices.

---

## 🚀 Features

### ✅ Role-Based Access Control (RBAC)
- Separate interfaces for Engineers, Contractors, and Workers.
- Secure login & session handling.

### 📝 Blueprint Annotation
- Upload and annotate architectural blueprints.
- Pin tasks, comments, and materials directly on site plans.

### 📋 Task & Project Tracking
- Assign tasks to teams or individuals.
- Visual project progress updates with Gantt-style tracking.

### 📦 Inventory Management
- Track materials, orders, and deliveries.
- Low-stock alerts and material usage logs.

### 🧠 AI-Powered RAG Chatbot *(Coming Soon)*
- Query construction standards, safety guidelines, and project-specific data using a Retrieval-Augmented Generation (RAG) chatbot powered by LangChain & Gemini.

### ☁️ AWS Deployment
- **EC2** for backend hosting  
- **S3** for blueprint and asset storage  
- **RDS** / **MongoDB Atlas** for database  
- **CloudWatch** for monitoring  
- **Route 53** & **SSL** for custom domain and HTTPS

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
