from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.db.database import Base

class FollowUp(Base):
    __tablename__ = "followups"

    id = Column(Integer, primary_key=True, index=True)
    lead_id = Column(Integer, ForeignKey("leads.id"), nullable=False)
    sequence_step = Column(Integer, default=1)
    title = Column(String(200), nullable=False)
    channel = Column(String(50), default="EMAIL") # EMAIL, PHONE_CALL, LINKEDIN
    scheduled_at = Column(DateTime, nullable=False)
    status = Column(String(50), default="PENDING") # PENDING, SENT, CANCELLED, COMPLETED
    
    # Generated message draft
    generated_subject = Column(String(255), nullable=True)
    generated_body = Column(Text, nullable=True)
    is_automated = Column(Boolean, default=True)
    sent_at = Column(DateTime, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    lead = relationship("Lead", back_populates="followups")
