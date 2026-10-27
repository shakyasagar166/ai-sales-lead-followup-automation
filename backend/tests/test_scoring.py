import asyncio
from app.agents.lead_scoring_agent import LeadScoringAgent
from app.agents.lead_qualification_agent import LeadQualificationAgent

def test_qualification_agent():
    async def _test():
        agent = LeadQualificationAgent()
        res = await agent.qualify_lead({
            "first_name": "Marcus",
            "last_name": "Vance",
            "email": "marcus@cloudscale.io",
            "job_title": "VP of Infrastructure",
            "company": "CloudScale",
            "industry": "Cloud",
            "budget": 50000
        })
        assert res["qualification_status"] in ["SQL", "MQL"]
        assert res["confidence"] >= 0.8
    asyncio.run(_test())

def test_lead_scoring_agent():
    async def _test():
        agent = LeadScoringAgent()
        res = await agent.score_lead({
            "first_name": "Elena",
            "email": "elena@fintech.io",
            "job_title": "Director of QA Engineering",
            "company": "Fintech",
            "budget": 75000
        })
        assert res["score"] >= 70.0
        assert res["priority"] in ["HOT", "HIGH"]
    asyncio.run(_test())
