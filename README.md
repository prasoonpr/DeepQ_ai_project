# MERN + Django Project

This is a **React + Tailwind frontend** and a **Django backend** project.  

- **Frontend** → React (with TailwindCSS) hosted on **Vercel**  
- **Backend** → Django REST API hosted on **Render**  

---

## 🚀 Features
- User authentication with sample credentials  
- REST API powered by Django  
- Modern UI with React + TailwindCSS  
- Frontend deployment on Vercel  
- Backend deployment on Render  

---

## 🧑‍💻 Sample Login
- **Username:** `sampleuser`  
- **Password:** `sample@123`  

---

## 📂 Project Structure
project-root/
│── backend/ # Django project
│ ├── manage.py
│ ├── requirements.txt
│ ├── .venv/ (created locally only, not pushed to Git)
│
│── frontend/ # React project
│ ├── src/
│ ├── package.json
│ ├── tailwind.config.js
│ ├── postcss.config.js


## ⚙️ Backend Setup (Django)

### 1. Create Virtual Environment
```bash
cd backend
python -m venv venv
source venv/bin/activate   # (Linux/Mac)
venv\Scripts\activate      # (Windows)

Run Locally
python manage.py migrate
python manage.py runserver


Your backend will run at:
👉 http://127.0.0.1:8000

🌐 Deploy Django Backend on Render

Push backend code to GitHub (only backend folder, not venv).

Create a new Render Web Service → Connect your GitHub repo.

In Render setup:

Build Command:

pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput


Start Command:

gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT


Add a PostgreSQL database in Render (if needed) and update DATABASES in settings.py.

After deploy, your API will be live at something like:
👉 https://your-backend.onrender.com

🎨 Frontend Setup (React + Tailwind)
1. Install Dependencies
cd frontend
npm install

2. Install TailwindCSS (v3)
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

3. Configure tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

4. Add Tailwind to src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

5. Run Locally
npm run dev


Your frontend runs at:
👉 http://localhost:5173

🌐 Deploy React Frontend on Vercel

Push frontend folder to GitHub.

Go to Vercel
 → Import Project from GitHub.

Select the frontend repo → Deploy.

After deploy, your frontend will be live at:
👉 https://your-frontend.vercel.app

🔗 Connect Frontend + Backend

Update frontend API calls to point to your Render backend URL instead of http://localhost:8000.

Example in React:

const API_URL = "https://your-backend.onrender.com/api";
