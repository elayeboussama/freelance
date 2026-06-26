# Freelance

A full-stack **company / employee / project management** application: a **Django REST** backend and a **React + Vite + TypeScript** front-end.

## Tech stack

- **Frontend:** React, Vite, TypeScript, Axios
- **Backend:** Django, Django REST Framework, SQLite (development)
- **Domain modules:** companies, employees, projects, users

## Getting started

### Prerequisites

- Node.js 18+
- Python 3.10+

### Backend (Django)

```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate   |   macOS/Linux: source venv/bin/activate
pip install -r requirements.txt        # or: pip install django djangorestframework
python manage.py migrate
python manage.py runserver             # http://127.0.0.1:8000
```

### Frontend (React + Vite)

```bash
npm install
npm run dev                            # http://localhost:5173
```

## Project structure

```
backend/   Django REST API (companies, employees, projects, users)
src/       React + Vite + TypeScript front-end
```
