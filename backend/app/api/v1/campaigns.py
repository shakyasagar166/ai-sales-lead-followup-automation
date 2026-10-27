from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.core.security import verify_api_key
from app.schemas.campaign import CampaignCreate, CampaignUpdate, CampaignResponse
from app.services.campaign_service import CampaignService

router = APIRouter(prefix="/campaigns", tags=["Campaigns"], dependencies=[Depends(verify_api_key)])

@router.get("", response_model=List[CampaignResponse])
def list_campaigns(db: Session = Depends(get_db)):
    service = CampaignService(db)
    return service.get_campaigns()

@router.post("", response_model=CampaignResponse, status_code=status.HTTP_201_CREATED)
def create_campaign(campaign_in: CampaignCreate, db: Session = Depends(get_db)):
    service = CampaignService(db)
    return service.create_campaign(campaign_in)

@router.get("/{campaign_id}", response_model=CampaignResponse)
def get_campaign(campaign_id: int, db: Session = Depends(get_db)):
    service = CampaignService(db)
    camp = service.get_campaign(campaign_id)
    if not camp:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return camp

@router.patch("/{campaign_id}", response_model=CampaignResponse)
def update_campaign(campaign_id: int, update_in: CampaignUpdate, db: Session = Depends(get_db)):
    service = CampaignService(db)
    camp = service.update_campaign(campaign_id, update_in)
    if not camp:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return camp
