from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.core.security import verify_api_key
from app.services.analytics_service import AnalyticsService

router = APIRouter(prefix="/analytics", tags=["Analytics"], dependencies=[Depends(verify_api_key)])

@router.get("/dashboard")
def get_dashboard_metrics(db: Session = Depends(get_db)):
    service = AnalyticsService(db)
    return service.get_dashboard_metrics()
