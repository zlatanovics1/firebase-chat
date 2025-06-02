# 🔥 Firebase Chat App

A real-time **chat and messaging app** powered by **Firebase**, **React**, and **Redux** — with image uploads, user presence, notifications (via FCM), and serverless backend functions.

---

## ✨ Features

- 🔐 Firebase Auth (Google & Email Sign-In)
- 💬 Real-time messaging via Firestore
- 📦 Image uploads with Firebase Storage
- 🛎️ Push notifications using Firebase Cloud Messaging (FCM)
- ⚙️ Serverless functions for backend logic
- 📱 User presence & online indicators
- 🌐 TypeScript + React + Redux architecture

---

## 🛠️ Tech Stack

- **Frontend:** React + Redux Toolkit + Tailwind CSS + Vite + TypeScript
- **Backend:** Firebase Functions (TypeScript)
- **Services:** Firebase Auth, Firestore, Storage, FCM
- **Dev Tools:** ESLint, Prettier, Vite

---

## 🚀 Getting Started

### 1. Clone the repository

```
git clone https://github.com/zlatanovics1/firebase-chat.git
cd firebase-chat
```

### 2. Install dependencies
```
npm install
cd backend/functions && npm install
```

### 3. Firebase Setup
Create a Firebase project

Enable Authentication (Google/Email)

Set up Firestore, Storage, and Cloud Messaging

Download firebaseConfig and place it in src/config/firebase.ts

### 4. Environment Setup
Create a .env file in the root if needed for additional variables.

Make sure Firebase CLI is installed:

```
npm install -g firebase-tools
firebase login
firebase use --add
```

### 5. Run the app
Frontend
```
npm run dev
```
Backend (Firebase Functions)
```
cd backend/functions
npm run build
firebase deploy --only functions
```

📬 Messaging & Notifications
Messages are stored in Firestore under chats/{chatId}/messages

FCM is integrated for real-time push notifications

Service Workers registered via public/firebase-messaging-sw.js
