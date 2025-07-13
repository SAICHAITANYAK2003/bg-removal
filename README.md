# 📸 BG Removal App – Image Background Removal with Credits System

Welcome to the **BG Removal** project. This is a full-stack application that allows users to upload images and remove their backgrounds using an external API. It implements user authentication, a credit system, payment processing, and secure image storage.

---

## 🚀 Live Demo

🌐 **Frontend:** [https://bgremoval.webinfloo.com](https://bgremoval.webinfloo.com)

---

## 🎯 Features

* ✅ User authentication with Clerk
* ✅ Webhooks for user creation, update, and deletion
* ✅ Credit-based usage system
* ✅ Payment integration with Razorpay
* ✅ Image background removal via ClipDrop API
* ✅ Image storage in Cloudinary
* ✅ Responsive frontend built with React and Tailwind CSS
* ✅ Hosted on Vercel (Frontend) and Render (Backend)

---

## 👢 Project Structure

```
bg-removal/
  frontend/           (React app)
  backend/
    config/           (Database, Cloudinary, Multer)
    controllers/      (Business logic for users, images)
    middlewares/      (User authentication)
    models/           (Mongoose schemas)
    routes/           (Express routes)
    server.js         (Main server entry)
    .env              (Environment variables)
```

---

## 🔧 Tech Stack

### Frontend

* React
* React Router
* Clerk (Authentication)
* Tailwind CSS
* react-hot-toast
* react-icons

### Backend

* Node.js
* Express.js
* Clerk Webhooks (Svix)
* Razorpay (for payments)
* MongoDB (Mongoose)
* Cloudinary (image storage)
* Multer (file upload)

### Deployment

* Frontend: Vercel
* Backend: Render

---

## 📁 API Endpoints

### User Routes

* `POST /api/user/webhooks`
  → Handles Clerk webhooks for user creation, update, and deletion.

* `GET /api/user/credits`
  → Returns user’s current credit balance.

* `POST /api/user/payment`
  → Creates Razorpay order for purchasing credits.

* `POST /api/user/verify`
  → Verifies Razorpay payment and credits user account.

### Image Routes

* `POST /api/image/remove-bg`
  → Accepts an image file, removes background using ClipDrop API, stores the result in Cloudinary, deducts 1 credit.

---

## 🛡️ Security

* Clerk authentication using JWT
* Svix signature verification for webhooks
* Secure API keys in `.env`
* Proper error handling with meaningful responses
* Input validation for image uploads

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repo

```bash
git clone https://github.com/yourusername/bg-removal.git
cd bg-removal
```

### 2️⃣ Install dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

### 3️⃣ Configure Environment Variables

Create `.env` in **backend/** folder:

```
PORT=4000
MONGODB_URL=your_mongodb_connection_string
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
CLIPDROP_API_KEY=your_clipdrop_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
CURRENCY=INR
```

---

### 4️⃣ Run the app locally

#### Backend

```bash
npm run server
```

Runs on: `http://localhost:4000`

#### Frontend

```bash
npm run dev
```

Runs on: `http://localhost:5173`

---

## 💰 Payments

* Users can choose between **Basic**, **Advanced**, and **Business** credit plans.
* Payments handled via Razorpay.
* Transaction details stored in MongoDB.

---

## 📸 Image Processing Flow

1️⃣ User uploads an image
2️⃣ App verifies credits and deducts 1 credit
3️⃣ Sends image to ClipDrop API for background removal
4️⃣ Stores processed image on Cloudinary
5️⃣ Returns processed image URL to frontend

---

## ⚡️ Future Improvements

* Add unit & integration tests (Jest, Supertest)
* Rate limiting with Express middleware
* Add UI for payment history
* Improve error logging and monitoring
* CI/CD pipeline

---

## 🤝 Contributing

Pull requests welcome! For major changes, please open an issue first.

---

## ✨ Author

Developed by **Sai Chaitanya**.
 

---

## 🔗 Links

* Frontend Live: [Vercel Link](https://bgremoval.webinfloo.com)
* Backend Deployed: [Render Link](https://bg-removal-4w0d.onrender.com)

---



