from fastapi.testclient import TestClient
from app.main import app
from app.core.config import settings

client = TestClient(app)
HEADERS = {settings.API_KEY_HEADER_NAME: settings.DEFAULT_API_KEY}

def test_list_and_create_campaign():
    res = client.get("/api/v1/campaigns", headers=HEADERS)
    assert res.status_code == 200
    assert isinstance(res.json(), list)

    payload = {
        "name": "FinTech QA Automation Campaign 2026",
        "description": "Multi-touch outbound cadence targeted at Directors of QA in Noida, Delhi and global hubs.",
        "target_segment": "Enterprise QA",
        "channel": "EMAIL",
        "cadence_days": 3
    }
    create_res = client.post("/api/v1/campaigns", json=payload, headers=HEADERS)
    assert create_res.status_code == 201
    camp = create_res.json()
    assert camp["name"] == payload["name"]
    assert "id" in camp

def test_analytics_dashboard():
    res = client.get("/api/v1/analytics/dashboard", headers=HEADERS)
    assert res.status_code == 200
    data = res.json()
    assert "total_leads" in data
    assert "pipeline_stages" in data
    assert "avg_lead_score" in data
