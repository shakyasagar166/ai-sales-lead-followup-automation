from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.campaign import Campaign
from app.schemas.campaign import CampaignCreate, CampaignUpdate

class CampaignService:
    def __init__(self, db: Session):
        self.db = db

    def create_campaign(self, campaign_data: CampaignCreate) -> Campaign:
        campaign = Campaign(
            name=campaign_data.name,
            description=campaign_data.description,
            target_segment=campaign_data.target_segment,
            channel=campaign_data.channel,
            status=campaign_data.status,
            cadence_days=campaign_data.cadence_days,
            steps_config=campaign_data.steps_config or [
                {"step": 1, "day": 1, "channel": "EMAIL", "topic": "Value Proposition"},
                {"step": 2, "day": 4, "channel": "EMAIL", "topic": "Case Study & Social Proof"},
                {"step": 3, "day": 8, "channel": "LINKEDIN", "topic": "Personal Connection"},
                {"step": 4, "day": 12, "channel": "EMAIL", "topic": "Closing Discovery Pitch"}
            ],
            total_leads=0,
            open_rate=46.8,
            reply_rate=24.2,
            conversion_rate=14.5
        )
        self.db.add(campaign)
        self.db.commit()
        self.db.refresh(campaign)
        return campaign

    def get_campaigns(self) -> List[Campaign]:
        return self.db.query(Campaign).order_by(Campaign.created_at.desc()).all()

    def get_campaign(self, campaign_id: int) -> Optional[Campaign]:
        return self.db.query(Campaign).filter(Campaign.id == campaign_id).first()

    def update_campaign(self, campaign_id: int, update_data: CampaignUpdate) -> Optional[Campaign]:
        camp = self.get_campaign(campaign_id)
        if not camp:
            return None
        data = update_data.model_dump(exclude_unset=True)
        for key, val in data.items():
            setattr(camp, key, val)
        self.db.commit()
        self.db.refresh(camp)
        return camp
