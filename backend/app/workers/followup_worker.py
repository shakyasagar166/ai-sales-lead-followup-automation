import asyncio
from datetime import datetime
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.followup import FollowUp
from app.services.followup_service import FollowUpService
from app.core.logging_config import logger

class FollowUpWorker:
    """Processes scheduled outreach touches when scheduled_at threshold is reached."""

    async def run_batch(self):
        db: Session = SessionLocal()
        try:
            now = datetime.utcnow()
            due_followups = db.query(FollowUp).filter(
                FollowUp.status == "PENDING",
                FollowUp.is_automated.is_(True),
                FollowUp.scheduled_at <= now
            ).limit(20).all()

            logger.info(f"[FollowUpWorker] Found {len(due_followups)} follow-ups ready for automated dispatch.")
            service = FollowUpService(db)
            for fu in due_followups:
                await service.execute_followup(fu.id)
        except Exception as e:
            logger.error(f"[FollowUpWorker] Error during automated batch: {e}")
        finally:
            db.close()
