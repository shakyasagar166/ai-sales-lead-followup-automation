from fastapi.testclient import TestClient
from app.main import app
from app.core.config import settings

client = TestClient(app)
HEADERS = {settings.API_KEY_HEADER_NAME: settings.DEFAULT_API_KEY}

def test_health_check():
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json()["status"] == "healthy"
    assert "uncodemy_courses" in res.json()

def test_list_leads():
    res = client.get("/api/v1/leads", headers=HEADERS)
    assert res.status_code == 200
    leads = res.json()
    assert isinstance(leads, list)
    assert len(leads) >= 1

def test_create_and_qualify_lead():
    payload = {
        "first_name": "Sophia",
        "last_name": "Alvarez",
        "email": "sophia.alvarez@innovate-ai.tech",
        "company": "Innovate AI",
        "job_title": "Chief Technology Officer",
        "industry": "Artificial Intelligence",
        "company_size": "50-200",
        "budget": 60000.0,
        "notes": "Looking to automate sales follow-up cadences."
    }
    res = client.post("/api/v1/leads?auto_qualify=true", json=payload, headers=HEADERS)
    assert res.status_code == 201
    data = res.json()
    assert data["first_name"] == "Sophia"
    assert data["qualification_status"] in ["SQL", "MQL"]
    assert data["score"] >= 70.0
    assert data["priority"] in ["HOT", "HIGH"]
