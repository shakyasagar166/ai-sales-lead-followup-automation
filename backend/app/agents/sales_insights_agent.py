from typing import Dict, Any, Optional
from app.integrations.llm_client import LLMClient
from app.core.logging_config import logger

class SalesInsightsAgent:
    """Delivers predictive deal risk analysis, pipeline velocity metrics, and tactical recommendations."""

    def __init__(self, llm_client: Optional[LLMClient] = None):
        self.llm = llm_client or LLMClient()

    async def generate_insights(self, lead_data: Dict[str, Any], interactions: Optional[list] = None) -> Dict[str, Any]:
        system_instruction = (
            "You are a Chief Revenue Officer (CRO) and AI sales strategist. Synthesize lead telemetry, "
            "recommend actionable next steps, forecast win probabilities, and evaluate deal momentum. Return JSON."
        )

        prompt = f"""
Lead Context:
Name: {lead_data.get('first_name')} {lead_data.get('last_name', '')}
Company: {lead_data.get('company')}
Score: {lead_data.get('score', 60)}
Stage: {lead_data.get('status', 'NEW')}
Interaction Count: {len(interactions or [])}

Synthesize:
{{
  "deal_health": "STRONG | STEADY | AT_RISK",
  "recommended_next_action": "Tactical next step for the sales representative",
  "churn_risk": "LOW | MEDIUM | HIGH",
  "closing_probability": 0.0 - 1.0,
  "strategic_notes": "Key observation on buying committee dynamics"
}}
"""
        logger.info(f"[SalesInsightsAgent] Formulating deal insights for {lead_data.get('email')}")
        result = await self.llm.generate_json(prompt, system_instruction)
        return {
            "deal_health": result.get("deal_health", "STRONG"),
            "recommended_next_action": result.get(
                "recommended_next_action",
                "Share customer case study and coordinate calendar booking."
            ),
            "churn_risk": result.get("churn_risk", "LOW"),
            "closing_probability": float(result.get("closing_probability", 0.75)),
            "strategic_notes": result.get(
                "strategic_notes",
                "Strong buying signals observed; maintain proactive cadence."
            )
        }
