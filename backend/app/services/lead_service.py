from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from app.models.lead import Lead
from app.models.interaction import Interaction
from app.schemas.lead import LeadCreate, LeadUpdate
from app.agents.lead_qualification_agent import LeadQualificationAgent
from app.agents.lead_scoring_agent import LeadScoringAgent
from app.core.logging_config import logger

class LeadService:
    def __init__(self, db: Session):
        self.db = db
        self.qual_agent = LeadQualificationAgent()
        self.scoring_agent = LeadScoringAgent()

    async def create_lead(self, lead_data: LeadCreate, auto_qualify: bool = True) -> Lead:
        lead = Lead(**lead_data.model_dump())
        self.db.add(lead)
        self.db.commit()
        self.db.refresh(lead)

        if auto_qualify:
            lead_dict = {
                "first_name": lead.first_name,
                "last_name": lead.last_name,
                "email": lead.email,
                "job_title": lead.job_title,
                "company": lead.company,
                "industry": lead.industry,
                "budget": lead.budget,
                "notes": lead.notes
            }
            qual_res = await self.qual_agent.qualify_lead(lead_dict)
            score_res = await self.scoring_agent.score_lead(lead_dict)

            lead.qualification_status = qual_res["qualification_status"]
            lead.score = score_res["score"]
            lead.priority = score_res["priority"]
            lead.intent_level = score_res["intent_level"]

            self.db.commit()
            self.db.refresh(lead)

        logger.info(f"[LeadService] Lead #{lead.id} created ({lead.email}) with score {lead.score}")
        return lead

    def get_leads(
        self,
        skip: int = 0,
        limit: int = 50,
        status: Optional[str] = None,
        priority: Optional[str] = None
    ) -> List[Lead]:
        query = self.db.query(Lead)
        if status and status != "ALL":
            query = query.filter(Lead.status == status)
        if priority and priority != "ALL":
            query = query.filter(Lead.priority == priority)
        return query.order_by(Lead.score.desc()).offset(skip).limit(limit).all()

    def get_lead(self, lead_id: int) -> Optional[Lead]:
        return self.db.query(Lead).filter(Lead.id == lead_id).first()

    def update_lead(self, lead_id: int, update_data: LeadUpdate) -> Optional[Lead]:
        lead = self.get_lead(lead_id)
        if not lead:
            return None
        data = update_data.model_dump(exclude_unset=True)
        for key, val in data.items():
            setattr(lead, key, val)
        self.db.commit()
        self.db.refresh(lead)
        return lead

    def add_interaction(
        self,
        lead_id: int,
        channel: str,
        content: str,
        subject: Optional[str] = None,
        direction: str = "OUTBOUND",
        outcome: Optional[str] = None
    ) -> Interaction:
        interaction = Interaction(
            lead_id=lead_id,
            channel=channel,
            direction=direction,
            subject=subject,
            content=content,
            outcome=outcome
        )
        self.db.add(interaction)
        self.db.commit()
        self.db.refresh(interaction)
        return interaction
