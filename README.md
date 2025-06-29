# HopeFundr

[![Live Site](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge)](https://hope-fundr.web.app)
[![License](https://img.shields.io/github/license/nafx0/hopefundr?style=for-the-badge)](./LICENSE)

A modern crowdfunding platform built to empower individuals and organizations to raise funds transparently and efficiently. Whether it’s for medical emergencies, education, or creative projects — HopeFundr enables anyone to create, share, and support causes that matter.

---

## 🚀 Live Demo

👉 [https://hope-fundr.web.app](https://hope-fundr.web.app)

---

## 🧩 Tech Stack

### Frontend
- **React.js** + **Vite**
- **Tailwind CSS** (UI Styling)
- **SweetAlert2** (Modal UI)
- **Lucide Icons** (Iconography)
- **React Router DOM**

### Backend
- **Express.js** (Node.js)
- **MongoDB** (Cloud Atlas)
- **Vercel Serverless Functions** (Backend hosting)
- **Firebase** (Frontend hosting & auth)

---

## 📌 Features

- 🧑 Create and manage fundraising campaigns
- 💳 Donate to campaigns securely
- 📊 Track goal progress visually
- 📬 Email-based campaign filtering
- 🕓 Real-time updates on campaign deadline and progress
- 💡 Supporters and donation history

---

## 💡 Motivation

HopeFundr was built to solve the real-world problem of fragmented and unverified donation systems. By offering a streamlined, full-stack solution, it enables:
- Transparent fundraising
- Easier campaign sharing
- Real-time supporter engagement

---

## 🛠️ Getting Started Locally

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas URI
- Firebase Project (for auth & hosting)

### Clone & Run
```bash
git clone https://github.com/nafx0/hopefundr.git
cd hopefundr

# Install frontend
cd client
npm install
npm run dev

# In a separate terminal, run backend
cd ../server
npm install
npm run dev
