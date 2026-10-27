from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, Float, JSON
from app.db.database import Base

class Campaign(Base):
    __tablename__ = "campaigns"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    target_segment = Column(String(100), default="Enterprise")
    channel = Column(String(50), default="EMAIL")
    status = Column(String(50), default="ACTIVE") # DRAFT, ACTIVE, PAUSED, COMPLETED
    cadence_days = Column(Integer, default=3) # Days between touches
    total_leads = Column(Integer, default=0)
    open_rate = Column(Float, default=0.0)
    reply_rate = Column(Float, default=0.0)
    conversion_rate = Column(Float, default=0.0)
    steps_config = Column(JSON, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
