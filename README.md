# 🚀 Shaksham Agarwal — Premium Portfolio + Admin CMS

A production-grade full-stack developer portfolio with a powerful backend admin dashboard (CMS) for managing all content dynamically.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS v4 + Framer Motion |
| Backend | Java 17 + Spring Boot 3 + Spring Security |
| Database | MySQL 8 |
| Auth | JWT + BCrypt |
| Images | Cloudinary |

---

## 📁 Project Structure

```
Portfolio-Website/
├── frontend/   — React + Vite app
└── backend/    — Spring Boot API
```

---

## ⚡ Quick Start

### Backend

1. Install Java 17+ and Maven
2. Create MySQL database: `portfolio_db`
3. Configure `backend/src/main/resources/application.yml`:
   - Set your MySQL password
   - Set Cloudinary credentials
4. Run:

```bash
cd backend
mvn spring-boot:run
```

The backend starts on **http://localhost:8080**

On first run, it automatically seeds:
- Default admin: `admin` / `Admin@123`
- 15 skills, 6 services, 2 experience entries, about section

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend starts on **http://localhost:5173**

---

## 🔑 Admin Panel

Navigate to: **http://localhost:5173/admin/login**

Default credentials:
- Username: `admin`
- Password: `Admin@123`

> ⚠️ Change password after first login in production!

---

## 🌐 Public Portfolio Sections

| Section | Description |
|---------|-------------|
| Hero | Full-screen animated intro with typing effect |
| About | Bio, career summary, resume download |
| Skills | Tabbed by category with progress bars |
| Projects | Filter by category, glassmorphism cards + modal |
| Experience | Animated vertical timeline |
| Services | Service cards with icons |
| Testimonials | Animated carousel |
| Contact | Form + WhatsApp + social links |

---

## 🛡️ Admin CMS Features

- **Dashboard** — Stats overview (projects, skills, messages)
- **Projects** — Full CRUD + image upload
- **Skills** — Add/edit/delete by category
- **Services** — Manage service cards
- **Experience** — Timeline management
- **Testimonials** — Manage reviews
- **Messages** — Inbox with mark-read, delete, reply
- **About** — Edit all profile info, social links, resume URL

---

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build: `npm run build`
2. Deploy `dist/` folder
3. Set env: `VITE_API_URL=https://your-backend.onrender.com/api`

### Backend (Render/Railway)
1. Push to GitHub
2. Create new Web Service on Render
3. Build command: `mvn clean package -DskipTests`
4. Start command: `java -jar target/portfolio-1.0.0.jar`
5. Set environment variables:
   - `SPRING_DATASOURCE_URL`
   - `SPRING_DATASOURCE_USERNAME`
   - `SPRING_DATASOURCE_PASSWORD`
   - `JWT_SECRET`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `CORS_ALLOWED_ORIGINS` (your Netlify URL)

---

## 📝 API Endpoints

### Public (No Auth)
```
GET  /api/projects
GET  /api/projects/featured
GET  /api/skills
GET  /api/services
GET  /api/experience
GET  /api/testimonials
GET  /api/about
POST /api/contact
```

### Admin (JWT Required)
```
POST /api/auth/login
CRUD /api/admin/projects
CRUD /api/admin/skills
CRUD /api/admin/services
CRUD /api/admin/experience
CRUD /api/admin/testimonials
GET  /api/admin/messages
PATCH /api/admin/messages/{id}/read
DELETE /api/admin/messages/{id}
GET/PUT /api/admin/about
GET  /api/admin/stats
POST /api/admin/upload
```
