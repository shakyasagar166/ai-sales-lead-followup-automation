from typing import List, Optional, Dict, Any
from datetime import datetime
from sqlalchemy.orm import Session
from app.models.lead import Lead
from app.models.followup import FollowUp
from app.models.interaction import Interaction
from app.agents.followup_planning_agent import FollowUpPlanningAgent
from app.agents.message_generation_agent import MessageGenerationAgent
from app.integrations.email_client import EmailClient
from app.schemas.followup import FollowUpCreate, FollowUpUpdate

class FollowUpService:
    def __init__(self, db: Session):
        self.db = db
        self.planning_agent = FollowUpPlanningAgent()
        self.msg_agent = MessageGenerationAgent()
        self.email_client = EmailClient()

    async def generate_cadence_for_lead(self, lead_id: int) -> List[FollowUp]:
        lead = self.db.query(Lead).filter(Lead.id == lead_id).first()
        if not lead:
            return []

        lead_dict = {
            "first_name": lead.first_name,
            "last_name": lead.last_name,
            "email": lead.email,
            "job_title": lead.job_title,
            "company": lead.company,
            "industry": lead.industry,
            "priority": lead.priority
        }
        cadence_plan = await self.planning_agent.plan_cadence(lead_dict)

        created_followups = []
        for step in cadence_plan:
            msg_res = await self.msg_agent.generate_message(
                lead_data=lead_dict,
                sequence_step=step["sequence_step"],
                channel=step["channel"],
                objective=step["objective"]
            )
            fu = FollowUp(
                lead_id=lead.id,
                sequence_step=step["sequence_step"],
                title=step["title"],
                channel=step["channel"],
                scheduled_at=step["scheduled_at"],
                status="PENDING",
                generated_subject=msg_res["subject"],
                generated_body=msg_res["body"],
                is_automated=True
            )
            self.db.add(fu)
            created_followups.append(fu)

        self.db.commit()
        for fu in created_followups:
            self.db.refresh(fu)
        return created_followups

    def get_followups(
        self,
        lead_id: Optional[int] = None,
        status: Optional[str] = None
    ) -> List[FollowUp]:
        query = self.db.query(FollowUp)
        if lead_id:
            query = query.filter(FollowUp.lead_id == lead_id)
        if status and status != "ALL":
            query = query.filter(FollowUp.status == status)
        return query.order_by(FollowUp.scheduled_at.asc()).all()

    async def execute_followup(self, followup_id: int) -> Optional[FollowUp]:
        fu = self.db.query(FollowUp).filter(FollowUp.id == followup_id).first()
        if not fu:
            return None

        lead = self.db.query(Lead).filter(Lead.id == fu.lead_id).first()
        if not lead:
            return None

        # Dispatch via email client
        send_res = await self.email_client.send_followup_email(
            to_email=lead.email,
            to_name=f"{lead.first_name} {lead.last_name or ''}".strip(),
            subject=fu.generated_subject or "Following up on our conversation",
            body=fu.generated_body or "",
            lead_id=lead.id
        )

        fu.status = "COMPLETED"
        fu.sent_at = datetime.utcnow()

        # Log as interaction
        interaction = Interaction(
            lead_id=lead.id,
            channel=fu.channel,
            direction="OUTBOUND",
            subject=fu.generated_subject,
            content=fu.generated_body or "Automated follow-up message",
            outcome="DELIVERED"
        )
        self.db.add(interaction)

        # Update lead stage if needed
        if lead.status == "NEW":
            lead.status = "CONTACTED"

        self.db.commit()
        self.db.refresh(fu)
        return fu

    def update_followup(self, followup_id: int, update_data: FollowUpUpdate) -> Optional[FollowUp]:
        fu = self.db.query(FollowUp).filter(FollowUp.id == followup_id).first()
        if not fu:
            return None
        data = update_data.model_dump(exclude_unset=True)
        for key, val in data.items():
            setattr(fu, key, val)
        self.db.commit()
        self.db.refresh(fu)
        return fu
