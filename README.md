# Recipe Planner MVP (React + Node + MongoDB)

**What this contains**
- `backend/` — Node.js + Express API with Mongoose (Recipe CRUD + shopping list generator)
- `frontend/` — React (Vite) app with Recipe CRUD UI and shopping list generator
- MVP: Create / Read / Update / Delete recipes; select recipes and generate an aggregated shopping list (with ingredient scaling).

**Quick start (development)**
1. Install MongoDB and run it locally OR use MongoDB Atlas.  
2. Backend:
   - `cd backend`
   - `npm install`
   - copy `.env.example` -> `.env` and set `MONGO_URI` and `PORT` (default 4000)
   - `npm run dev`
3. Frontend:
   - `cd frontend`
   - `npm install`
   - `npm run dev`
   - Open the printed Vite URL (usually http://localhost:5173)

**Notes**
- The backend expects a MongoDB URI. For convenience you can run without Mongo by using the provided in-memory fallback (if `MONGO_URI` is not set the server will run in memory, suitable for testing).
- This project is structured as an MVP. Extensions: authentication, meal calendar persistence, drag-drop planner, prettier UI, user accounts.

Enjoy! — Your friendly nerdy mentor 🤓
