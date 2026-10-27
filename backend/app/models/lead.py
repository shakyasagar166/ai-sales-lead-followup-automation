from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.db.database import Base

class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    phone = Column(String(50), nullable=True)
    company = Column(String(200), nullable=True)
    job_title = Column(String(150), nullable=True)
    industry = Column(String(100), nullable=True)
    company_size = Column(String(50), nullable=True)
    budget = Column(Float, nullable=True, default=0.0)

    # Lead Qualification & Pipeline State
    status = Column(String(50), default="NEW")  # NEW, QUALIFIED, CONTACTED, MEETING_BOOKED, PROPOSAL, WON, LOST
    qualification_status = Column(String(50), default="UNQUALIFIED") # UNQUALIFIED, MQL, SQL, DISQUALIFIED
    score = Column(Float, default=50.0) # 0 to 100
    priority = Column(String(20), default="MEDIUM") # LOW, MEDIUM, HIGH, HOT
    intent_level = Column(String(50), default="Exploratory") # High, Moderate, Exploratory, Low

    source = Column(String(100), default="Website Form")
    notes = Column(Text, nullable=True)
    custom_fields = Column(JSON, nullable=True)
    
    assigned_to = Column(String(150), default="Alex Mercer")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    interactions = relationship("Interaction", back_populates="lead", cascade="all, delete-orphan")
    followups = relationship("FollowUp", back_populates="lead", cascade="all, delete-orphan")
