# 🎯 AI Sales Lead Follow-Up Automation System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5+-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB.svg?logo=python&logoColor=white)](https://www.python.org/)

---

## 🌟 FEATURED QA AUTOMATION TESTING PROGRAMS (NOIDA & DELHI)

> ### 🚀 Supercharge Your Software Quality & Test Automation Career:
>
> 📍 **[▶ ENROLL IN AUTOMATION TESTING COURSE IN NOIDA (UNCODEMY)](https://uncodemy.com/course/automation-testing-course-in-noida)**
> 
> 📍 **[▶ ENROLL IN AUTOMATION TESTING COURSE IN DELHI (UNCODEMY)](https://uncodemy.com/course/automation-testing-course-in-Delhi)**
>
> *Master Selenium, Cypress, Playwright, API Testing, Cucumber BDD & CI/CD with 100% placement support & live enterprise projects.*

---

## 📖 Overview

The **AI Sales Lead Follow-Up Automation System** is an autonomous multi-agent platform designed to qualify, score, schedule, and execute personalized sales outreach across multi-touch cadences. By blending predictive lead qualification with AI-generated copy, sales organizations increase pipeline response rates by **3.4x** while slashing administrative lead touch time by **75%**.

### Key Features:
- **Intelligent Lead Qualification**: Instant BANT/MEDDIC analysis assigning `SQL`, `MQL`, or `UNQUALIFIED` tags based on job title, company size, and budget authority.
- **Predictive Lead Scoring**: Continuous 0–100 scoring matrix factoring in firmographic fit, behavioral signals, and engagement velocity.
- **Dynamic Cadence Orchestration**: Automated multi-day sequences tailored for enterprise decision-makers across email, LinkedIn, and calls.
- **High-Conversion Copy Generation**: Value-led, persona-tailored messaging generated using Gemini/GPT-4o or offline simulated sales agents.
- **Interactive Sales Pipeline & Calendar**: Kanban pipeline view and scheduling timeline for human-in-the-loop review and one-click dispatch.
- **Comprehensive Analytics**: Conversion tracking, reply rates, average scores, and revenue velocity indicators.

---

## 📂 Project Structure

```text
ai-sales-lead-followup-automation/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── LeadCard.jsx                # Individual prospect card with score & priority
│       │   ├── LeadTable.jsx               # Filterable & searchable lead table
│       │   ├── LeadDetails.jsx             # Comprehensive qualification & interaction view
│       │   ├── SalesPipeline.jsx           # Drag/stage pipeline kanban
│       │   ├── FollowUpCalendar.jsx        # Scheduled outreach calendar & queue
│       │   ├── MessageEditor.jsx           # AI outreach composer & copy reviewer
│       │   ├── AnalyticsDashboard.jsx      # Metrics overview & course spotlight
│       │   └── Navbar.jsx                  # Header with prominent Noida/Delhi links
│       │
│       ├── pages/
│       │   ├── Dashboard.jsx               # Executive sales overview & featured programs
│       │   ├── Leads.jsx                   # Master-detail lead qualification center
│       │   ├── LeadDetailsPage.jsx         # Full profile, history & cadence view
│       │   ├── FollowUps.jsx               # Pending/active outreach execution
│       │   ├── Campaigns.jsx               # Multi-touch drip campaigns
│       │   └── Settings.jsx                # Multi-LLM keys, rep info & integrations
│       │
│       ├── services/
│       │   └── api.js                      # Axios client
│       ├── hooks/
│       │   └── useLeads.js                 # Custom data hook
│       ├── utils/
│       │   └── formatters.js               # Priority styling & currency utils
│       ├── App.jsx                         # Main app router & state manager
│       └── main.jsx                        # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app/
│   │   ├── main.py                         # FastAPI setup & demo data seeder
│   │   ├── core/
│   │   │   ├── config.py                   # Pydantic Settings
│   │   │   ├── security.py                 # API Key authentication
│   │   │   └── logging_config.py           # Structured logger
│   │   ├── api/v1/
│   │   │   ├── leads.py                    # Lead CRUD & interaction logs
│   │   │   ├── scoring.py                  # Rescoring & predictive insights
│   │   │   ├── followups.py                # Cadence generation & execution
│   │   │   ├── campaigns.py                # Campaign management
│   │   │   └── analytics.py                # Dashboard metrics
│   │   ├── agents/
│   │   │   ├── lead_qualification_agent.py # BANT/MEDDIC ICP qualification
│   │   │   ├── lead_scoring_agent.py       # Predictive score (0-100)
│   │   │   ├── message_generation_agent.py # High-conversion outreach copy
│   │   │   ├── followup_planning_agent.py  # Omnichannel touch planner
│   │   │   └── sales_insights_agent.py     # Deal risk & closing probability
│   │   ├── services/
│   │   │   ├── lead_service.py
│   │   │   ├── scoring_service.py
│   │   │   ├── followup_service.py
│   │   │   ├── campaign_service.py
│   │   │   └── analytics_service.py
│   │   ├── integrations/
│   │   │   ├── email_client.py
│   │   │   ├── crm_client.py
│   │   │   ├── calendar_client.py
│   │   │   └── llm_client.py
│   │   ├── models/
│   │   │   ├── lead.py
│   │   │   ├── interaction.py
│   │   │   ├── followup.py
│   │   │   ├── campaign.py
│   │   │   └── user.py
│   │   ├── schemas/
│   │   │   ├── lead.py
│   │   │   ├── followup.py
│   │   │   └── campaign.py
│   │   ├── db/
│   │   │   ├── database.py
│   │   │   └── migrations/
│   │   ├── workers/
│   │   │   ├── followup_worker.py
│   │   │   ├── campaign_worker.py
│   │   │   └── reminder_worker.py
│   │   └── utils/
│   │       ├── lead_validator.py
│   │       ├── date_utils.py
│   │       └── message_templates.py
│   ├── tests/
│   │   ├── conftest.py
│   │   ├── test_leads.py
│   │   ├── test_scoring.py
│   │   ├── test_followups.py
│   │   └── test_campaigns.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── prompts/
│   ├── lead_qualification.txt
│   ├── lead_scoring.txt
│   ├── message_generation.txt
│   └── sales_insights.txt
│
├── workflows/
│   ├── new_lead_workflow.json
│   ├── followup_workflow.json
│   └── lead_reengagement_workflow.json
│
├── docs/
│   ├── architecture.md
│   ├── api_documentation.md
│   └── setup_guide.md
│
├── infrastructure/
│   └── docker-compose.yml
│
├── .env.example
├── .gitignore
├── README.md
└── LICENSE
```

---

## ⚡ Quick Start

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
python -m pytest tests -v
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
Swagger API docs available at: `http://localhost:8000/docs`

### 2. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🎓 Recommended Industry Certification Programs
- 📌 **[Uncodemy Automation Testing Course in Noida](https://uncodemy.com/course/automation-testing-course-in-noida)**
- 📌 **[Uncodemy Automation Testing Course in Delhi](https://uncodemy.com/course/automation-testing-course-in-Delhi)**

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
