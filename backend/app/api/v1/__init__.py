from fastapi import APIRouter
from app.api.v1.leads import router as leads_router
from app.api.v1.scoring import router as scoring_router
from app.api.v1.followups import router as followups_router
from app.api.v1.campaigns import router as campaigns_router
from app.api.v1.analytics import router as analytics_router

api_v1_router = APIRouter()
api_v1_router.include_router(leads_router)
api_v1_router.include_router(scoring_router)
api_v1_router.include_router(followups_router)
api_v1_router.include_router(campaigns_router)
api_v1_router.include_router(analytics_router)
