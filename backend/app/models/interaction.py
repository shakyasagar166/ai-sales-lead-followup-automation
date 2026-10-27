from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.db.database import Base

class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)
    lead_id = Column(Integer, ForeignKey("leads.id"), nullable=False)
    channel = Column(String(50), default="EMAIL") # EMAIL, CALL, LINKEDIN, SMS, MEETING
    direction = Column(String(20), default="OUTBOUND") # INBOUND, OUTBOUND
    subject = Column(String(255), nullable=True)
    content = Column(Text, nullable=False)
    sentiment = Column(String(50), default="Neutral") # Positive, Neutral, Hesitant, Negative
    outcome = Column(String(100), nullable=True) # OPENED, REPLIED, BOUNCED, NO_ANSWER, BOOKED
    metadata_info = Column(JSON, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)

    lead = relationship("Lead", back_populates="interactions")
