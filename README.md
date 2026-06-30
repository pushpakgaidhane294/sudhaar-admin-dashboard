# 🏛️ Sudhaar – Smart Municipal Complaint Management System

A modern web-based Municipal Complaint Management System developed using **React.js**, **Firebase**, **Material UI**, **React Leaflet**, and **Recharts**. The system enables municipal authorities to manage citizen complaints efficiently through real-time updates, interactive dashboards, and location-based visualization.

---

## 📌 Features

### 🔐 Authentication
- Firebase Email & Password Authentication
- Secure Login System
- Session Persistence

### 📋 Complaint Management
- View all complaints
- Update complaint status
- Delete complaints (Admin)
- Complaint details dialog
- Real-time Firestore updates

### 📊 Analytics Dashboard
- KPI Cards
  - Total Complaints
  - Pending
  - In Progress
  - Completed
- Monthly Complaint Trend
- Complaint Status Chart
- Complaint Category Distribution
- AI Insights
- Recent Complaint Activity

### 🗺️ Live Complaint Map
- React Leaflet Integration
- OpenStreetMap
- Complaint Markers
- Popup Details
- Latitude & Longitude Support

### ⚡ Real-Time Updates
- Firestore onSnapshot Listener
- Automatic Dashboard Refresh
- Live Complaint Tracking

### 👥 Role-Based Access (In Progress)
- Admin
- Worker

---

# 🛠️ Tech Stack

## Frontend
- React.js
- JavaScript (ES6+)
- HTML5
- CSS3

## UI Framework
- Material UI (MUI)
- Material Icons

## Backend
- Firebase Authentication
- Cloud Firestore

## Charts
- Recharts
  - Line Chart
  - Bar Chart
  - Pie Chart

## Maps
- React Leaflet
- Leaflet.js
- OpenStreetMap

---

# 📂 Project Structure

```
src/
│
├── components/
│   ├── AIInsights.jsx
│   ├── CategoryChart.jsx
│   ├── ComplaintMap.jsx
│   ├── Navbar.jsx
│   ├── RecentActivity.jsx
│   ├── Sidebar.jsx
│   ├── StatusChart.jsx
│   └── TrendChart.jsx
│
├── pages/
│   ├── Analytics.jsx
│   ├── Complaints.jsx
│   ├── Dashboard.jsx
│   └── Login.jsx
│
├── services/
│   ├── firestoreService.js
│   └── userService.js
│
├── firebase.js
├── App.js
└── index.js
```

---

# 📊 Dashboard Modules

## Dashboard
- Complaint Overview
- Quick Statistics
- Navigation Panel

## Complaint Management
- View Complaints
- Update Status
- Delete Complaint
- Complaint Details

## Analytics
- Live Complaint Map
- Monthly Trends
- Complaint Status
- Complaint Categories
- AI Insights
- Recent Activities

---

# 🔥 Firebase Collections

## reports

```
reports
|
|-- reportId
      title
      description
      type
      status
      priority
      assignedTo
      imageURL
      userName
      location
      timestamp
```

---

## users

```
users
|
|-- uid
      name
      email
      role
```

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/pushpakgaidhane294/sudhaar.git
```

Go inside project

```bash
cd sudhaar
```

Install dependencies

```bash
npm install
```

Start project

```bash
npm start
```

---

# 📦 Dependencies

```bash
npm install firebase
npm install @mui/material
npm install @mui/icons-material
npm install recharts
npm install react-router-dom
npm install react-toastify
npm install leaflet
npm install react-leaflet
```

---

# 🌍 Deployment

Build project

```bash
npm run build
```

Deploy using Firebase Hosting

```bash
firebase login
firebase init
firebase deploy
```

---

# 📈 Future Improvements

- AI Complaint Classification
- Email Notifications
- SMS Alerts
- Mobile Application
- Image Recognition
- Complaint Priority Automation
- Worker Assignment System
- Advanced Analytics
- Government API Integration

---

# 🎯 Learning Outcomes

This project demonstrates:

- React Component Architecture
- Firebase Authentication
- Cloud Firestore Integration
- Real-Time Database Updates
- Dashboard Development
- Data Visualization
- Interactive Maps
- CRUD Operations
- Role-Based Access Control
- Responsive UI Design

---

# 👨‍💻 Author

**Pushpak Bala Gaidhane**

### Technologies Used

- React.js
- Firebase Authentication
- Cloud Firestore
- Material UI
- React Leaflet
- OpenStreetMap
- Recharts
- JavaScript
- HTML5
- CSS3

---

# 📜 License

This project is developed for educational purposes as part of a final-year engineering project.

© 2026 Pushpak Bala Gaidhane
