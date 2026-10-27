from typing import Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models.lead import Lead
from app.agents.lead_scoring_agent import LeadScoringAgent
from app.agents.sales_insights_agent import SalesInsightsAgent

class ScoringService:
    def __init__(self, db: Session):
        self.db = db
        self.scoring_agent = LeadScoringAgent()
        self.insights_agent = SalesInsightsAgent()

    async def rescore_lead(self, lead_id: int) -> Optional[Dict[str, Any]]:
        lead = self.db.query(Lead).filter(Lead.id == lead_id).first()
        if not lead:
            return None

        lead_dict = {
            "first_name": lead.first_name,
            "last_name": lead.last_name,
            "email": lead.email,
            "job_title": lead.job_title,
            "company": lead.company,
            "industry": lead.industry,
            "budget": lead.budget,
            "score": lead.score,
            "status": lead.status
        }
        score_res = await self.scoring_agent.score_lead(lead_dict, lead.interactions)
        insights = await self.insights_agent.generate_insights(lead_dict, lead.interactions)

        lead.score = score_res["score"]
        lead.priority = score_res["priority"]
        lead.intent_level = score_res["intent_level"]

        self.db.commit()
        self.db.refresh(lead)

        return {
            "lead_id": lead.id,
            "new_score": lead.score,
            "priority": lead.priority,
            "intent_level": lead.intent_level,
            "breakdown": score_res.get("breakdown", {}),
            "insights": insights
        }
