# Complete Setup & Installation Guide

Step-by-step instructions to get the **AI Sales Lead Follow-Up Automation System** running locally or in Docker containers.

---

## 1. Prerequisites
- **Python 3.10+**
- **Node.js 18+** & npm
- **Git**
- Optional: **Docker & Docker Compose**

---

## 2. Backend Setup

1. **Navigate to backend:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run Pytest suite:**
   ```bash
   python -m pytest tests -v
   ```

5. **Start FastAPI application:**
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```
   Interactive Swagger documentation: `http://localhost:8000/docs`

---

## 3. Frontend Setup

1. **Navigate to frontend:**
   ```bash
   cd ../frontend
   ```

2. **Install node dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Access the dashboard at `http://localhost:5173`.

---

## 4. Docker Compose
Run both backend and frontend together:
```bash
docker-compose -f infrastructure/docker-compose.yml up --build
```

---

## 5. QA & Automated Testing Certifications
- 📌 **[Uncodemy Automation Testing Course in Noida](https://uncodemy.com/course/automation-testing-course-in-noida)**
- 📌 **[Uncodemy Automation Testing Course in Delhi](https://uncodemy.com/course/automation-testing-course-in-Delhi)**
