## 📃 Document

[Google Drive Link](https://drive.google.com/file/d/1CZw34n3LGe1XIEQT1Zw590_FLE3jz0OR/view?usp=sharing)

# Finance Tracker System 💰

Welcome to **Finance Tracker**, a secure and efficient **personal finance management system** built using **Node.js**, **Express.js**, **MongoDB**, and **JWT authentication**. This application enables users to **track expenses, set budgets, analyze spending trends, and generate financial reports**. Multi-currency support is integrated using **SerpAPI** for real-time currency conversion.

---
## 🚀 Features
### **1. Secure User Authentication**
- JWT-based authentication for secure login and registration.
- Passwords hashed with **bcrypt** for security.
- Admin role with advanced controls over users and transactions.

### **2. User & Role Management**
- **Admin:** Manage all users, transactions, and reports.
- **Regular User:** Add/edit transactions, set budgets, and track savings.
- Role-based **dashboard views** tailored for each user type.

### **3. Expense & Income Tracking**
- CRUD operations for managing income and expenses.
- Categorize transactions (Food, Transport, Entertainment, etc.).
- **Custom Tags** for transactions (e.g., `#vacation`, `#groceries`).
- **Recurring Transactions** (e.g., monthly rent, subscriptions).
- Multi-currency support using **real-time exchange rates**.

### **4. Budget Management**
- Set and manage **monthly/category-specific budgets**.
- **Notifications** when nearing/exceeding budgets.
- AI-powered **budget adjustment recommendations**.

### **5. Financial Reports**
- **Visualize** income vs. expenses using charts.
- Generate detailed **financial reports (PDF & email)**.
- Filter reports by **date, category, or tags**.

### **6. Savings & Goals Tracking**
- Set savings goals (e.g., new car, vacation fund).
- Progress tracking with visual indicators.
- Automate savings allocations from income.

### **7. Smart Notifications & Alerts**
- Get alerts for **unusual spending patterns**.
- Reminders for **bill payments and goal deadlines**.
- Email-based report delivery.

### **8. Advanced Security & Performance**
- Role-based **secure API endpoints**.
- **Data encryption** for sensitive information.
- Detailed error handling and **activity logging**.
- API documentation with **Swagger/Postman**.
- Comprehensive **unit and integration testing**.

---
## 🌟 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Token (JWT)
- **Currency Conversion:** SerpAPI (Google Search API)
- **PDF Generation:** pdfkit

---
## 🛠️ Setup Instructions
### **1. Clone the Repository**
```bash
git clone https://github.com/your-github-username/finance-tracker.git
```

### **2. Navigate to the Directory**
```bash
cd finance-tracker
```

### **3. Install Dependencies**
```bash
npm install
```

### **4. Configure Environment Variables**
Create a `.env` file in the root directory and add:
```bash
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
SERP_API_KEY=your_serp_api_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

### **5. Start the Server**
```bash
npm run dev
```
Your server will be running on: `http://localhost:8000`

---
## 📂 API Endpoints
### 🔐 **Authentication**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive a token |

### 👤 **User Management**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/` | Get all users (Admin only) |
| GET | `/api/users/:id` | Get user details |
| PUT | `/api/users/:id` | Update user profile |

### 💸 **Transactions**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/transactions` | Add a new transaction (currency conversion included) |
| GET | `/api/transactions` | Get all transactions (Admin: all, User: own) |
| PUT | `/api/transactions/:id` | Update a transaction |
| DELETE | `/api/transactions/:id` | Delete a transaction |

### 📊 **Budget Management**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/budgets` | Set a budget per category |
| GET | `/api/budgets` | Retrieve all budgets |
| PUT | `/api/budgets/:id` | Update a budget |
| DELETE | `/api/budgets/:id` | Remove a budget |

### 📚 **Financial Reports**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reports/email` | Generate and send financial reports via email |

### 🌍 **Multi-Currency Support**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/currency/convert` | Convert amount between currencies |

### 💼 **Goals & Savings Tracking**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/goals` | Create a new savings goal |
| GET | `/api/goals` | Retrieve all goals |
| PUT | `/api/goals/:id` | Update a goal |
| DELETE | `/api/goals/:id` | Remove a goal |

---
## 🔧 Testing
To ensure robustness, the application includes:
- **Unit Testing:** Jest/Mocha for testing individual functions.
- **Integration Testing:** API endpoint testing with Postman.
- **Security Testing:** Using **OWASP ZAP** for vulnerability detection.

Run tests using:
```bash
npm test
```
