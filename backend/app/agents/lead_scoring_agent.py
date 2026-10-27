from typing import Dict, Any, Optional
from app.integrations.llm_client import LLMClient
from app.core.logging_config import logger

class LeadScoringAgent:
    """Calculates continuous predictive lead score (0-100), Priority, and Intent Level."""

    def __init__(self, llm_client: Optional[LLMClient] = None):
        self.llm = llm_client or LLMClient()

    async def score_lead(self, lead_data: Dict[str, Any], interaction_history: Optional[list] = None) -> Dict[str, Any]:
        system_instruction = (
            "You are an AI predictive lead scoring specialist. Score the lead from 0.0 to 100.0 based on "
            "firmographic fit, behavioral signals, job seniority, and conversion likelihood. Return strictly JSON."
        )

        prompt = f"""
Lead Information:
Name: {lead_data.get('first_name')} {lead_data.get('last_name', '')}
Title: {lead_data.get('job_title')}
Company: {lead_data.get('company')}
Industry: {lead_data.get('industry')}
Budget: ${lead_data.get('budget', 0)}
Interactions Count: {len(interaction_history or [])}

Calculate:
{{
  "score": 0.0 - 100.0,
  "priority": "HOT | HIGH | MEDIUM | LOW",
  "intent_level": "High | Moderate | Exploratory | Low",
  "breakdown": {{
     "firmographic_fit": 0-30,
     "behavioral_intent": 0-30,
     "budget_authority": 0-25,
     "engagement_momentum": 0-15
  }},
  "key_growth_signals": ["string"]
}}
"""
        logger.info(f"[LeadScoringAgent] Computing predictive score for {lead_data.get('email')}")
        result = await self.llm.generate_json(prompt, system_instruction)
        score = float(result.get("score", 72.0))
        priority = result.get("priority", "HIGH" if score >= 70 else "MEDIUM")
        
        return {
            "score": score,
            "priority": priority,
            "intent_level": result.get("intent_level", "Moderate"),
            "breakdown": result.get("breakdown", {}),
            "key_growth_signals": result.get("key_growth_signals", ["Active prospect"])
        }
