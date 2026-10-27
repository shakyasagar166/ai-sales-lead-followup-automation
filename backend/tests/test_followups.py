import asyncio
from fastapi.testclient import TestClient
from app.main import app
from app.core.config import settings
from app.agents.message_generation_agent import MessageGenerationAgent

client = TestClient(app)
HEADERS = {settings.API_KEY_HEADER_NAME: settings.DEFAULT_API_KEY}

def test_message_generation_agent():
    async def _test():
        agent = MessageGenerationAgent()
        res = await agent.generate_message(
            lead_data={"first_name": "Marcus", "company": "CloudScale", "job_title": "VP Engineering"},
            sequence_step=1,
            channel="EMAIL"
        )
        assert "subject" in res
        assert "body" in res
        assert len(res["body"]) > 30
    asyncio.run(_test())

def test_list_and_send_followup():
    res = client.get("/api/v1/followups", headers=HEADERS)
    assert res.status_code == 200
    followups = res.json()
    assert isinstance(followups, list)
    if followups:
        fu_id = followups[0]["id"]
        send_res = client.post(f"/api/v1/followups/send/{fu_id}", headers=HEADERS)
        assert send_res.status_code == 200
        assert send_res.json()["status"] == "COMPLETED"
