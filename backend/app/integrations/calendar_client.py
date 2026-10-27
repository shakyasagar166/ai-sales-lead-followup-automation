from typing import Dict, Any, List
from datetime import datetime, timedelta
from app.core.logging_config import logger

class CalendarClient:
    """Client for calendar scheduling, discovery meeting booking & availability lookups."""

    async def get_available_slots(self, rep_name: str = "Alex Mercer") -> List[Dict[str, Any]]:
        logger.info(f"[CalendarClient] Checking meeting availability slots for {rep_name}...")
        now = datetime.utcnow()
        slots = []
        for d in [1, 2, 3]:
            slot_date = now + timedelta(days=d)
            slots.append({
                "date": slot_date.strftime("%Y-%m-%d"),
                "time": "14:00 UTC",
                "display": f"{slot_date.strftime('%A, %b %d')} at 2:00 PM UTC",
                "rep": rep_name
            })
            slots.append({
                "date": slot_date.strftime("%Y-%m-%d"),
                "time": "16:30 UTC",
                "display": f"{slot_date.strftime('%A, %b %d')} at 4:30 PM UTC",
                "rep": rep_name
            })
        return slots
