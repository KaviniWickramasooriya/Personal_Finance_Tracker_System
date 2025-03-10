[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/xIbq4TFL)


# Finance Tracker 💰

Finance Tracker is a personal finance management system built using **Node.js**, **Express.js**, **MongoDB**, and **JWT authentication**. This application allows users to **track expenses, set budgets, analyze spending trends**, and generate financial reports. Multi-currency support is integrated using **SerpAPI's Google Search** for real-time currency conversion.

## 🚀 Features
- **User Authentication (JWT)**
  - Secure login & registration.
  - User password hashed using bcrypt and decode when login.
   
- **User Management**
  - Update and view user profile.
  - Admin can get all user details.
   
- **Transaction Management - Expense & Income Tracking**
  - Categorized transactions with multi-currency support. For real time currency support use SerpApi.
  - Admin can view all transactions of all users.
  - user can view their all transactions.
   
- **Budget Management**
  - Set and track budget limits per category.
  - User can create budgets and set limits.
  - Send warnings when spent amount exeed budget.
  - User can get all budgets and update and delete budgets.
   
- **Goal & Savings Tracking**
  - Set financial goals and track progress.
  - View goals and their status.
  - Update goal and user can delete a goal.

- **Category Management**
  - Create categories for setup goals and budgets.
  - update and delete categories.
   
- **Multi-Currency Support**
  - Converts transactions to a base currency using real-time exchange rates.
   
- **Financial Reports**
  - Generate and email PDF reports.

<br/><br/>

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Token (JWT)
- **Currency Conversion**: SerpAPI (Google Search API)
- **PDF Generation**: pdfkit

<br/>


## 🏗️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/SE1020-IT2070-OOP-DSA-25/project-IreshEranga.git
```
### 2️⃣ Navigate to the directory
After cloning, move into the project directory:

```bash
cd project-IreshEranga
cd frontend
```
### 3️⃣ Install Dependencies
```bash
npm install
```
### 4️⃣ Configure Environment Variables
Create <b>.env<b/> file in the root directory and add:

```bash
PORT =  8000
MONGO_URI =  your_mongodb_connection_string
JWT_SECRET =  your_jwt_secret_key
SERP_API_KEY =  your_serp_api_key
EMAIL_USER =  your_email@gmail.com
EMAIL_PASS =  your_email_app_password
```

### 5️⃣ Start server
```bash
npm run dev
```

The server will run on


```bash
http://localhost:8000
```
<br/><br/>


## 📌 API Endpoints

<br/>

### 🔐 Authentication  

**Table: Authentication API Endpoints**
<table>
  <tr>
    <th>Method</th>
    <th>Endpoint</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/auth/register</td>
    <td>Register new user</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/auth/login</td>
    <td>Login user or admin & get token</td>
  </tr>
</table>

---

### 👤 User Management  
**Table: User Management API Endpoints**
<table>
  <tr>
    <th>Method</th>
    <th>Endpoint</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/users/</td>
    <td>Get all users</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/users/:id</td>
    <td>Get user by id</td>
  </tr>
  <tr>
    <td>PUT</td>
    <td>/api/users/:id</td>
    <td>Update user by id</td>
  </tr>
</table>

---
### 💸 Transactions  
**Table: Transaction API Endpoints**
<table>
  <tr>
    <th>Method</th>
    <th>Endpoint</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/transactions</td>
    <td>Add a new transaction (with currency conversion)</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/transactions</td>
    <td>Get all transactions (Admin: all, User: own)</td>
  </tr>
  <tr>
    <td>PUT</td>
    <td>/api/transactions/:id</td>
    <td>Update a transaction</td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td>/api/transactions/:id</td>
    <td>Delete a transaction</td>
  </tr>
</table>

---

### 🎯 Budget Management  
**Table: Budget Management API Endpoints**
<table>
  <tr>
    <th>Method</th>
    <th>Endpoint</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/budgets</td>
    <td>Set a budget per category</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/budgets</td>
    <td>Get all budgets</td>
  </tr>
  <tr>
    <td>PUT</td>
    <td>/api/budgets/:id</td>
    <td>Update a budget</td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td>/api/budgets/:id</td>
    <td>Delete a budget</td>
  </tr>
</table>

---

### 📊 Financial Reports  
**Table: Financial Reports API Endpoints**
<table>
  <tr>
    <th>Method</th>
    <th>Endpoint</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/reports/email</td>
    <td>Generate financial report (PDF & Email)</td>
  </tr>
</table>


---


### 📂 Category Management  
**Table: Category API Endpoints**
<table>
  <tr>
    <th>Method</th>
    <th>Endpoint</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/category</td>
    <td>Create a new category</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/categories</td>
    <td>Get all category</td>
  </tr>
  <tr>
    <td>PUT</td>
    <td>/api/category/:id</td>
    <td>Update a category</td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td>/api/category/:id</td>
    <td>Delete a category</td>
  </tr>
</table>

---

### 🎯 Goals & Savings Tracking  
**Table: Goals API Endpoints**
<table>
  <tr>
    <th>Method</th>
    <th>Endpoint</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/goals</td>
    <td>Create a financial goal</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/goals</td>
    <td>Get all financial goals</td>
  </tr>
  <tr>
    <td>PUT</td>
    <td>/api/goals/:id</td>
    <td>Update goal progress</td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td>/api/goals/:id</td>
    <td>Delete a financial goal</td>
  </tr>
</table>
