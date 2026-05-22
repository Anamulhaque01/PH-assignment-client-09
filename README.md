# DocAppoint 🩺 — Healthcare Management System

A responsive full-stack serverless web application connecting patients with medical specialists, featuring secure profile management, multi-method authentication, and a real-time bookings matrix.

## 🚀 Live Links

- **Frontend UI (Vercel):** [https://ph-assignment-client-09.vercel.app/](https://ph-assignment-client-09.vercel.app/)
- **Backend API (Vercel):** [https://ph-assignment-server-09.vercel.app/](https://ph-assignment-server-09.vercel.app/)

---

## ✨ Key Features

- **Secure Auth Gateway:** Manual registration/login alongside Google OAuth2 pop-up integration. Includes a 6-character validation schema and JWT persistence.
- **Physician Directory:** Asynchronous name search (`$regex`) with dynamic list sorting based on the highest-rated metrics.
- **Patient Workspace (CRUD):** Complete dashboard tracking booked sessions with interactive `PUT` / `DELETE` operations and real-time profile modal updates.
- **SEO Metadata Hooks:** Implements server-side rendering configurations via Next.js folder layout/page abstraction layers.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), Tailwind CSS, React Hot Toast
- **Backend:** Node.js, Express.js, MongoDB Atlas, Google Auth Library

---

## 📦 Local Setup Guide

### 1. Backend Config

Navigate to your server directory, run `npm install`, and create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Run the server: `npm run dev`

### 2. Frontend Config

Navigate to your client directory, run `npm install`, and create a `.env.local` file:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

Run the UI: `npm run dev` (Access via `http://localhost:3000`)

---

## 🧪 Challenges Addressed

### 🔄 Serverless Connection Drops

To avoid `MongoTopologyClosedError` when serverless containers go dormant, the backend checks and reconnects the database driver topology active state dynamically:

```javascript
if (!client.topology || !client.topology.isConnected()) {
  await client.connect();
}
```

### 🔀 Strict CORS Policy

Restricts data endpoint communication exclusively to authorized domains via a strict origin whitelisting array:

```javascript
const allowedOrigins = [
  "http://localhost:3000",
  "[https://ph-assignment-client-09.vercel.app](https://ph-assignment-client-09.vercel.app)",
];
```

### 🌐 Hybrid Metadata Optimization

Bypasses client-side rendering restrictions on `"use client"` interface files by nesting dedicated server layout engines within route directories to feed SEO crawls.
