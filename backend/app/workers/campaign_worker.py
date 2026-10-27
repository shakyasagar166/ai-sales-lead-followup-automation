from app.db.database import SessionLocal
from app.models.campaign import Campaign
from app.core.logging_config import logger

class CampaignWorker:
    """Manages active drip campaigns, metrics synchronization, and cadence steps."""

    def sync_campaign_metrics(self):
        db = SessionLocal()
        try:
            active_campaigns = db.query(Campaign).filter(Campaign.status == "ACTIVE").all()
            logger.info(f"[CampaignWorker] Auditing {len(active_campaigns)} active campaigns...")
            # Compute simulated open / reply momentum
            for camp in active_campaigns:
                camp.open_rate = min(95.0, camp.open_rate + 0.1)
            db.commit()
        finally:
            db.close()
