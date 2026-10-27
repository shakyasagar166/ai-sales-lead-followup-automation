from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class CampaignBase(BaseModel):
    name: str
    description: Optional[str] = None
    target_segment: str = "Enterprise"
    channel: str = "EMAIL"
    status: str = "ACTIVE"
    cadence_days: int = 3
    steps_config: Optional[List[Dict[str, Any]]] = None

class CampaignCreate(CampaignBase):
    pass

class CampaignUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    target_segment: Optional[str] = None
    status: Optional[str] = None
    cadence_days: Optional[int] = None

class CampaignResponse(CampaignBase):
    id: int
    total_leads: int
    open_rate: float
    reply_rate: float
    conversion_rate: float
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
