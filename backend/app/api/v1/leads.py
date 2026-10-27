from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.core.security import verify_api_key
from app.schemas.lead import LeadCreate, LeadUpdate, LeadResponse, InteractionCreate, InteractionResponse
from app.services.lead_service import LeadService

router = APIRouter(prefix="/leads", tags=["Leads"], dependencies=[Depends(verify_api_key)])

@router.post("", response_model=LeadResponse, status_code=status.HTTP_201_CREATED)
async def create_lead(
    lead_in: LeadCreate,
    auto_qualify: bool = Query(True, description="Run AI lead qualification & scoring automatically"),
    db: Session = Depends(get_db)
):
    service = LeadService(db)
    return await service.create_lead(lead_in, auto_qualify=auto_qualify)

@router.get("", response_model=List[LeadResponse])
def list_leads(
    skip: int = 0,
    limit: int = 50,
    status: Optional[str] = Query(None),
    priority: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    service = LeadService(db)
    return service.get_leads(skip=skip, limit=limit, status=status, priority=priority)

@router.get("/{lead_id}", response_model=LeadResponse)
def get_lead(lead_id: int, db: Session = Depends(get_db)):
    service = LeadService(db)
    lead = service.get_lead(lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return lead

@router.patch("/{lead_id}", response_model=LeadResponse)
def update_lead(lead_id: int, update_in: LeadUpdate, db: Session = Depends(get_db)):
    service = LeadService(db)
    lead = service.update_lead(lead_id, update_in)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return lead

@router.post("/{lead_id}/interactions", response_model=InteractionResponse, status_code=status.HTTP_201_CREATED)
def log_interaction(
    lead_id: int,
    interaction_in: InteractionCreate,
    db: Session = Depends(get_db)
):
    service = LeadService(db)
    lead = service.get_lead(lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return service.add_interaction(
        lead_id=lead_id,
        channel=interaction_in.channel,
        content=interaction_in.content,
        subject=interaction_in.subject,
        direction=interaction_in.direction,
        outcome=interaction_in.outcome
    )
