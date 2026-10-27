from datetime import datetime, timedelta

def get_next_business_day(days_ahead: int = 1) -> datetime:
    current = datetime.utcnow()
    added = 0
    while added < days_ahead:
        current += timedelta(days=1)
        # Skip Saturday (5) and Sunday (6)
        if current.weekday() < 5:
            added += 1
    # Standardize to 10:00 AM UTC
    return current.replace(hour=10, minute=0, second=0, microsecond=0)
