from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class FollowUpBase(BaseModel):
    lead_id: int
    sequence_step: int = 1
    title: str
    channel: str = "EMAIL"
    scheduled_at: datetime
    status: str = "PENDING"
    generated_subject: Optional[str] = None
    generated_body: Optional[str] = None
    is_automated: bool = True

class FollowUpCreate(FollowUpBase):
    pass

class FollowUpUpdate(BaseModel):
    title: Optional[str] = None
    channel: Optional[str] = None
    scheduled_at: Optional[datetime] = None
    status: Optional[str] = None
    generated_subject: Optional[str] = None
    generated_body: Optional[str] = None
    is_automated: Optional[bool] = None

class FollowUpResponse(FollowUpBase):
    id: int
    sent_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class GenerateMessageRequest(BaseModel):
    lead_id: int
    channel: str = "EMAIL" # EMAIL, LINKEDIN, SMS
    tone: str = "Persuasive & Professional" # Consultative, Value-First, Casual, Urgency
    objective: str = "Book Discovery Call" # Product Demo, Schedule Meeting, Follow-Up After Demo
    sequence_step: int = 1
