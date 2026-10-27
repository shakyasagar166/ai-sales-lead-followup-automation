from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.core.security import verify_api_key
from app.services.scoring_service import ScoringService

router = APIRouter(prefix="/scoring", tags=["Lead Scoring & Insights"], dependencies=[Depends(verify_api_key)])

@router.post("/rescore/{lead_id}")
async def rescore_lead(lead_id: int, db: Session = Depends(get_db)):
    service = ScoringService(db)
    result = await service.rescore_lead(lead_id)
    if not result:
        raise HTTPException(status_code=404, detail="Lead not found")
    return result
