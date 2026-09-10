# Arul Florinda D — Full-Stack Portfolio

A professional student developer portfolio built as a Full Stack Development internship project.

## Stack

- React.js + CSS
- Node.js + Express.js
- MongoDB + Mongoose
- REST APIs
- CRUD admin dashboard
- Database-backed contact form
- Responsive desktop/tablet/mobile UI

## Structure

```text
arul-florinda-portfolio/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api.js
│   │   ├── data.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── config/db.js
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   ├── seed.js
│   └── server.js
└── package.json
```

## 1. Install

Open the folder in VS Code.

From the root:

```bash
npm run install-all
```

Or separately:

```bash
cd backend
npm install
```

and in another terminal:

```bash
cd frontend
npm install
```

## 2. Connect MongoDB

### MongoDB Atlas

Create a MongoDB Atlas cluster, database user and allowed network access, then copy the connection string.

Create `backend/.env` from `backend/.env.example`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/arul_portfolio
CLIENT_URL=http://localhost:5173
```

### Local MongoDB

```env
MONGODB_URI=mongodb://127.0.0.1:27017/arul_portfolio
```

## 3. Seed the initial projects

After MongoDB is running:

```bash
cd backend
npm run seed
```

This adds the four portfolio projects and the initial hackathon record. Achievements remain empty until you add real records.

## 4. Start backend

```bash
cd backend
npm run dev
```

API:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

## 5. Start frontend

Create `frontend/.env` from `frontend/.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

Then:

```bash
cd frontend
npm run dev
```

Open the URL Vite shows, normally:

```text
http://localhost:5173
```

Admin dashboard:

```text
http://localhost:5173/admin
```

## REST API

### Projects

```text
GET    /api/projects
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id
```

### Achievements

```text
GET    /api/achievements
POST   /api/achievements
PUT    /api/achievements/:id
DELETE /api/achievements/:id
```

### Events

```text
GET    /api/events
POST   /api/events
PUT    /api/events/:id
DELETE /api/events/:id
```

### Contact

```text
POST /api/contact
GET  /api/contact
```

## Admin Dashboard

Go to `/admin`.

You can manage:

- Projects — add, edit, delete
- Achievements — add, edit, delete
- Hackathons/events — add, edit, delete
- Contact messages — view

The dashboard intentionally has no login because this is a simple internship demonstration. Before public deployment, add authentication and authorization to admin routes.

## Edit personal links

Open:

```text
frontend/src/data.js
```

Replace:

- `your-email@example.com`
- GitHub placeholder
- LinkedIn placeholder
- Other social placeholder

Add real GitHub/live demo URLs through the admin dashboard.

## Deploy frontend

Vercel or Netlify can host the React frontend.

Build:

```bash
cd frontend
npm run build
```

Output:

```text
frontend/dist
```

Set:

```env
VITE_API_URL=https://YOUR-BACKEND-DOMAIN/api
```

## Deploy backend

Render or Railway can host the Express backend.

Start command:

```bash
npm start
```

Set:

```env
PORT=5000
MONGODB_URI=your-mongodb-atlas-connection-string
CLIENT_URL=https://YOUR-FRONTEND-DOMAIN
```

## Connect deployed frontend + backend

1. Deploy the backend.
2. Copy its public URL.
3. Set the frontend `VITE_API_URL` to the backend URL plus `/api`.
4. Set backend `CLIENT_URL` to the deployed frontend URL.
5. Redeploy the frontend if the environment variable changed.

## Production security

For a real public admin panel, add:

- Admin authentication
- Password hashing
- JWT or secure sessions
- Authorization middleware
- Rate limiting
- Request validation
- Security headers
- Protected contact-message access

## Content approach

The portfolio deliberately keeps Home and About concise and avoids repeating the same information throughout the page. React/Node/Express/MongoDB are described as technologies being learned and used in the internship rather than advanced skills.


## GitHub deployment notes

- Frontend: `cd frontend` then `npm install` and `npm run dev`
- Backend: `cd backend` then `npm install` and `npm run dev`
- Keep MongoDB credentials in `backend/.env`; do not commit `.env` to GitHub.
- The profile photo is at `frontend/public/images/profile.jpg`.
