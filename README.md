# 🥗 NutriTrack - AI Food, Diet & Obesity App and Website

An intelligent full-stack AI platform for nutrition tracking, obesity assessment, meal planning, barcode scanning, and personalized dietary guidance.

---

## 🌟 Key Features

- 🤖 **AI Dietary Chatbot**: Real-time personalized nutrition & health assistant powered by Gemini & Hugging Face.
- ⚖️ **Obesity & Weight Management**: Body metrics analysis, BMI & obesity health tracking with custom calorie goals.
- 🥗 **Comprehensive Food Database & Logging**: Search thousands of foods, log daily meals (breakfast, lunch, dinner, snacks), and track macronutrients (protein, carbs, fats).
- 📷 **AI Food Image & Text Analysis**: Analyze meals and recipes with AI visual and textual nutrition decomposition.
- 🏷️ **Barcode Scanner**: Quickly scan food barcodes to extract instant nutritional labels.
- 🍲 **Recipe & Meal Planner**: Discover healthy recipes tailored to your fitness objectives with auto-calculated nutrition facts.
- 💧 **Water Tracker**: Daily hydration monitoring with progress gauges and reminders.
- 📊 **Visual Reports & Progress Analytics**: Interactive charts showing calorie intake trends, weight fluctuations, and micronutrient breakdown over time.
- 👥 **Community & Social Feed**: Share milestones, meal recipes, and dietary tips with fellow health enthusiasts.
- 📄 **Data Export**: Export health logs and nutritional reports to PDF or Excel spreadsheets.
- 🛡️ **Admin Portal & Management**: Comprehensive user management and session analytics.

---

## 🏗️ Architecture & Tech Stack

### **Frontend**
- **Framework**: React 18
- **UI Components**: Bootstrap 5, React Bootstrap, Material-UI (MUI), Emotion
- **Charts & Visualizations**: Chart.js, Recharts, React-Chartjs-2
- **Icons**: React Icons, Material Icons
- **Realtime**: Socket.io Client

### **Backend**
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB with Mongoose ODM
- **AI Integrations**: Google Generative AI (Gemini), Hugging Face, OpenAI
- **Realtime Communication**: Socket.io
- **Document Generation**: PDFKit, ExcelJS, XLSX
- **Barcode & QR Generation**: bwip-js, qr-image
- **Scheduling**: Node-cron

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.x or newer)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/gausikofficial011/AI-FOOD-DIET-AND-OBESITY-APP-AND-WEBSITE.git
cd AI-FOOD-DIET-AND-OBESITY-APP-AND-WEBSITE
```

### 2. Backend Configuration
Create a `.env` file in the `backend/` folder:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nutritrack
JWT_SECRET=your_jwt_secret_key

# AI Services
GEMINI_API_KEY=your_gemini_api_key
HF_API_KEY=your_huggingface_api_key
```

Install backend dependencies:
```bash
cd backend
npm install
```

### 3. Frontend Configuration
Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### 4. Running the Application
You can start both frontend and backend automatically using the included Windows batch script:
```cmd
StartApp.bat
```

Or manually in separate terminals:

**Backend:**
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

**Frontend:**
```bash
cd frontend
npm start
# Client runs on http://localhost:3000
```

---

## 📁 Project Structure

```text
├── backend/
│   ├── config/          # Database and external service configuration
│   ├── imageanalyze/    # AI visual nutrition estimation
│   ├── middleware/      # Auth & error handling middlewares
│   ├── models/          # Mongoose database schemas
│   ├── routes/          # Express API route endpoints
│   ├── seedData.js      # Initial seed dataset for food items
│   └── server.js        # Server entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components & navigation
│   │   ├── context/     # React Context state providers
│   │   ├── pages/       # Dashboard, Chatbot, FoodLog, Recipes, etc.
│   │   ├── services/    # API request client services
│   │   └── utils/       # Formatting & calculation utilities
│   └── package.json
│
├── StartApp.bat         # Single-click application launcher
└── README.md
```

---

## 📄 License
This project is licensed under the MIT License.
