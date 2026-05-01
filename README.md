# Dynamic Portfolio — Digital Curator 🎨

A premium, full-stack portfolio management system designed for UI/UX designers and creative professionals. Built with a focus on aesthetics, interactivity, and brand identity.

![Digital Curator Preview](https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1200&q=80)

## ✨ Features

- **Dynamic Tech Marquee**: Interactive skill showcase with vibrant brand icons powered by Iconify.
- **Real-time Theme Engine**: Switch between Light and Dark modes with instant persistence and zero-flash loading.
- **Brand Accents**: Fully customizable accent colors (Indigo, Rose, Emerald, Amber) that ripple across the entire UI.
- **Project Management**: Dedicated dashboard to manage, feature, and showcase your best work.
- **UI/UX Optimized**: Designed with a "Creative Director" aesthetic — clean typography, glassmorphism, and smooth animations.
- **Instant Data Seeding**: Pre-loaded with professional UI/UX designer demo data to get started in seconds.

## 🚀 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS v4, Framer Motion, Zustand, React Query.
- **Backend**: Node.js, Express, MongoDB, JWT Authentication (HttpOnly Cookies).
- **Icons**: Dynamic Iconify API (Logos & Simple Icons).

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/weamibrahim/Dynamic-Portfolio.git
   cd Dynamic-Portfolio
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   # Create a .env file with MONGODB_URI and JWT_SECRET
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Seed Demo Data (Optional)**
   ```bash
   cd ../backend
   node seed_uiux.js
   ```

## 🔐 Credentials (Demo)
- **Email**: `designer@digitalcurator.dev`
- **Password**: `Designer1234!`

## 📄 License
MIT License. Created with ❤️ for the design community.
