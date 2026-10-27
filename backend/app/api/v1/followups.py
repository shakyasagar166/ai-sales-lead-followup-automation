from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.core.security import verify_api_key
from app.schemas.followup import (
    FollowUpCreate,
    FollowUpUpdate,
    FollowUpResponse,
    GenerateMessageRequest
)
from app.services.followup_service import FollowUpService
from app.agents.message_generation_agent import MessageGenerationAgent
from app.models.lead import Lead

router = APIRouter(prefix="/followups", tags=["Follow-Ups & Outreach"], dependencies=[Depends(verify_api_key)])

@router.get("", response_model=List[FollowUpResponse])
def list_followups(
    lead_id: Optional[int] = Query(None),
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    service = FollowUpService(db)
    return service.get_followups(lead_id=lead_id, status=status)

@router.post("/generate-cadence/{lead_id}", response_model=List[FollowUpResponse])
async def generate_cadence(lead_id: int, db: Session = Depends(get_db)):
    service = FollowUpService(db)
    followups = await service.generate_cadence_for_lead(lead_id)
    if not followups:
        raise HTTPException(status_code=404, detail="Lead not found or cadence generation failed")
    return followups

@router.post("/send/{followup_id}", response_model=FollowUpResponse)
async def execute_followup(followup_id: int, db: Session = Depends(get_db)):
    service = FollowUpService(db)
    fu = await service.execute_followup(followup_id)
    if not fu:
        raise HTTPException(status_code=404, detail="Follow-up not found")
    return fu

@router.patch("/{followup_id}", response_model=FollowUpResponse)
def update_followup(followup_id: int, update_in: FollowUpUpdate, db: Session = Depends(get_db)):
    service = FollowUpService(db)
    fu = service.update_followup(followup_id, update_in)
    if not fu:
        raise HTTPException(status_code=404, detail="Follow-up not found")
    return fu

@router.post("/draft-message")
async def draft_message(req: GenerateMessageRequest, db: Session = Depends(get_db)):
    lead = db.query(Lead).filter(Lead.id == req.lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    agent = MessageGenerationAgent()
    lead_dict = {
        "first_name": lead.first_name,
        "last_name": lead.last_name,
        "email": lead.email,
        "job_title": lead.job_title,
        "company": lead.company,
        "industry": lead.industry
    }
    return await agent.generate_message(
        lead_data=lead_dict,
        sequence_step=req.sequence_step,
        channel=req.channel,
        tone=req.tone,
        objective=req.objective
    )
