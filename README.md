# Digital Curator — Full Stack Portfolio

## Tech Stack
**Frontend:** React + Vite + Tailwind CSS v4 + shadcn-style components + React Hook Form + Zod + TanStack Query + Zustand  
**Backend:** Node.js + Express + Mongoose (MongoDB)

---

## Quick Start

### 1. Backend
```bash
cd backend
cp .env.example .env        # edit MONGODB_URI and JWT_SECRET
npm install
npm start                   # runs on http://localhost:5000
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev                 # runs on http://localhost:5173
```

---

## Environment Variables

### backend/.env
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/digital-curator
JWT_SECRET=change_this_to_a_long_random_string
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### frontend/.env
```
VITE_API_URL=http://localhost:5000/api
```

---

## Pages & Routes

| Route | Page | Auth |
|-------|------|------|
| `/login` | Login / Register | Public |
| `/portfolio` | Public portfolio site | Public |
| `/overview` | Dashboard overview | Protected |
| `/projects` | Project list + management | Protected |
| `/projects/new` | Add new project | Protected |
| `/projects/:id/edit` | Edit project | Protected |
| `/analytics` | Analytics overview | Protected |
| `/settings` | Appearance & theme | Protected |

---

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET  /api/auth/me`
- `PUT  /api/auth/profile`

### Projects
- `GET    /api/projects?page=1&limit=8&status=&search=&category=`
- `GET    /api/projects/stats`
- `GET    /api/projects/:id`
- `POST   /api/projects` (multipart/form-data)
- `PUT    /api/projects/:id` (multipart/form-data)
- `DELETE /api/projects/:id`

### Analytics
- `GET /api/analytics/overview`

### Settings
- `GET  /api/settings`
- `PUT  /api/settings`
- `POST /api/settings/publish`

---

## Project Structure
```
digital-curator/
├── backend/
│   ├── server.js
│   ├── src/
│   │   ├── models/         User, Project, Settings
│   │   ├── routes/         auth, projects, analytics, settings
│   │   └── middleware/     auth (JWT)
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── store/          authStore (Zustand), uiStore (Zustand)
    │   ├── hooks/          useProjects, useApi (TanStack Query)
    │   ├── context/        AuthContext
    │   ├── components/ui/  Button, Card, Input, Toast, ConfirmDialog
    │   ├── pages/          Login, Overview, Projects, AddProject,
    │   │                   Analytics, Settings, Portfolio
    │   └── App.jsx         Providers + Router
    └── .env
```
