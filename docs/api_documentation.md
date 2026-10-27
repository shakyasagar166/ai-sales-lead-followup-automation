# API Documentation: AI Sales Lead Follow-Up Automation

All endpoints are hosted under `/api/v1` and authenticated using the `X-API-Key` header.

## 1. Authentication
```http
X-API-Key: sales-automation-secret-key-2026
```

---

## 2. Leads Endpoints

### Create & Qualify Lead
`POST /api/v1/leads?auto_qualify=true`

**Request:**
```json
{
  "first_name": "Marcus",
  "last_name": "Vance",
  "email": "marcus.vance@cloudscale.io",
  "job_title": "VP of Infrastructure",
  "company": "CloudScale Tech",
  "industry": "Cloud & DevSecOps",
  "budget": 45000.0,
  "notes": "Urgent need for automated regression testing."
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "first_name": "Marcus",
  "last_name": "Vance",
  "email": "marcus.vance@cloudscale.io",
  "status": "QUALIFIED",
  "qualification_status": "SQL",
  "score": 92.0,
  "priority": "HOT",
  "intent_level": "High"
}
```

### List Leads
`GET /api/v1/leads?status=QUALIFIED&priority=HOT`

### Get Lead Details
`GET /api/v1/leads/{id}`

---

## 3. Follow-Ups & Outreach

### Generate Cadence for Lead
`POST /api/v1/followups/generate-cadence/{lead_id}`
Creates a structured multi-touch sequence with pre-generated personalized outreach copy.

### Execute Follow-Up
`POST /api/v1/followups/send/{followup_id}`
Dispatches the email via SMTP/email client and marks status as `COMPLETED`.

### Generate Custom Draft Copy
`POST /api/v1/followups/draft-message`
```json
{
  "lead_id": 1,
  "channel": "EMAIL",
  "tone": "Persuasive & Professional",
  "objective": "Book Discovery Call",
  "sequence_step": 1
}
```

---

## 4. Analytics & Deals

### Dashboard Metrics
`GET /api/v1/analytics/dashboard`
Returns total leads, hot leads, pipeline stages, conversion rates, and average lead scores.

---

## 5. Professional Automation Testing References
- 📍 **[Uncodemy Automation Testing Course in Noida](https://uncodemy.com/course/automation-testing-course-in-noida)**
- 📍 **[Uncodemy Automation Testing Course in Delhi](https://uncodemy.com/course/automation-testing-course-in-Delhi)**
