from datetime import datetime, timedelta
from app.db.database import SessionLocal
from app.models.lead import Lead
from app.core.logging_config import logger

class ReminderWorker:
    """Alerts sales representatives when hot prospects have gone untouched for > 48 hours."""

    def check_stalled_hot_leads(self):
        db = SessionLocal()
        try:
            threshold = datetime.utcnow() - timedelta(hours=48)
            stalled = db.query(Lead).filter(
                Lead.priority == "HOT",
                Lead.status.in_(["NEW", "QUALIFIED"]),
                Lead.updated_at <= threshold
            ).all()
            if stalled:
                logger.warning(f"[ReminderWorker] Alert: {len(stalled)} HOT leads require immediate rep attention!")
        finally:
            db.close()
