from typing import Dict, Any, Optional
from app.core.config import settings
from app.core.logging_config import logger

class EmailClient:
    """Outbound email delivery and tracking mock/SMTP client."""

    def __init__(self):
        self.sender_email = settings.SALES_AGENT_EMAIL
        self.sender_name = settings.SALES_AGENT_NAME

    async def send_followup_email(
        self,
        to_email: str,
        to_name: str,
        subject: str,
        body: str,
        lead_id: Optional[int] = None
    ) -> Dict[str, Any]:
        logger.info(f"[EmailClient] Dispatching follow-up to {to_name} <{to_email}>: '{subject}'")
        # In mock / production mode, simulates fast successful SMTP dispatch
        return {
            "status": "SENT",
            "message_id": f"msg_sales_{lead_id or '0'}_{hash(to_email) % 100000}",
            "recipient": to_email,
            "subject": subject,
            "delivered": True
        }
