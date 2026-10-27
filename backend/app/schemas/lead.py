from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class InteractionBase(BaseModel):
    channel: str = "EMAIL"
    direction: str = "OUTBOUND"
    subject: Optional[str] = None
    content: str
    sentiment: Optional[str] = "Neutral"
    outcome: Optional[str] = None
    metadata_info: Optional[Dict[str, Any]] = None

class InteractionCreate(InteractionBase):
    lead_id: int

class InteractionResponse(InteractionBase):
    id: int
    lead_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class LeadBase(BaseModel):
    first_name: str
    last_name: Optional[str] = None
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    job_title: Optional[str] = None
    industry: Optional[str] = None
    company_size: Optional[str] = "50-200"
    budget: Optional[float] = 0.0
    source: Optional[str] = "Website Form"
    notes: Optional[str] = None
    custom_fields: Optional[Dict[str, Any]] = None
    assigned_to: Optional[str] = "Alex Mercer"

class LeadCreate(LeadBase):
    pass

class LeadUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    job_title: Optional[str] = None
    industry: Optional[str] = None
    budget: Optional[float] = None
    status: Optional[str] = None
    qualification_status: Optional[str] = None
    score: Optional[float] = None
    priority: Optional[str] = None
    intent_level: Optional[str] = None
    notes: Optional[str] = None
    assigned_to: Optional[str] = None

class LeadResponse(LeadBase):
    id: int
    status: str
    qualification_status: str
    score: float
    priority: str
    intent_level: str
    created_at: datetime
    updated_at: datetime
    interactions: Optional[List[InteractionResponse]] = []

    class Config:
        from_attributes = True
