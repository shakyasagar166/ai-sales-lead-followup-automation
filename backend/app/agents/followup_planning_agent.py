from typing import Dict, Any, List, Optional
from datetime import datetime, timedelta
from app.integrations.llm_client import LLMClient
from app.core.logging_config import logger

class FollowUpPlanningAgent:
    """Builds intelligent, multi-touch cadences based on lead priority, responsiveness, and buying stage."""

    def __init__(self, llm_client: Optional[LLMClient] = None):
        self.llm = llm_client or LLMClient()

    async def plan_cadence(self, lead_data: Dict[str, Any]) -> List[Dict[str, Any]]:
        priority = lead_data.get("priority", "MEDIUM")
        cadence_days = 2 if priority == "HOT" else (3 if priority == "HIGH" else 4)

        now = datetime.utcnow()
        plan = [
            {
                "sequence_step": 1,
                "title": "Introductory Value Proposition & Case Study",
                "channel": "EMAIL",
                "scheduled_at": now + timedelta(days=1),
                "objective": "Establish Credibility & Offer Solution Brief"
            },
            {
                "sequence_step": 2,
                "title": "Social Proof & ROI Impact Deep-Dive",
                "channel": "EMAIL",
                "scheduled_at": now + timedelta(days=1 + cadence_days),
                "objective": "Highlight 3.4x Pipeline Conversion Metric"
            },
            {
                "sequence_step": 3,
                "title": "LinkedIn Engagement / Multi-Channel Touch",
                "channel": "LINKEDIN",
                "scheduled_at": now + timedelta(days=1 + (cadence_days * 2)),
                "objective": "Connect & Share Relevant Industry Insight"
            },
            {
                "sequence_step": 4,
                "title": "Break-Up / Re-Engagement Checkpoint",
                "channel": "EMAIL",
                "scheduled_at": now + timedelta(days=1 + (cadence_days * 3)),
                "objective": "Respectful Final Inquiry & Resource Leave-Behind"
            }
        ]
        logger.info(f"[FollowUpPlanningAgent] Generated {len(plan)}-step cadence for lead {lead_data.get('email')}")
        return plan
