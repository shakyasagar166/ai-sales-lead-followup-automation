from typing import Dict, Any, Optional
from app.integrations.llm_client import LLMClient
from app.core.logging_config import logger

class LeadQualificationAgent:
    """Evaluates inbound lead ICP fit, role authority, company profile, and intent."""

    def __init__(self, llm_client: Optional[LLMClient] = None):
        self.llm = llm_client or LLMClient()

    async def qualify_lead(self, lead_data: Dict[str, Any]) -> Dict[str, Any]:
        system_instruction = (
            "You are an expert enterprise B2B sales development representative (SDR) and RevOps strategist. "
            "Qualify the lead according to BANT/MEDDIC criteria and output strictly JSON."
        )

        prompt = f"""
Lead Information:
Name: {lead_data.get('first_name')} {lead_data.get('last_name', '')}
Email: {lead_data.get('email')}
Job Title: {lead_data.get('job_title', 'Unknown')}
Company: {lead_data.get('company', 'Unknown')}
Industry: {lead_data.get('industry', 'Technology')}
Company Size: {lead_data.get('company_size', '50-200')}
Budget: ${lead_data.get('budget', 0)}
Notes: {lead_data.get('notes', 'None provided')}

Determine:
1. Qualification Status: SQL (Sales Qualified), MQL (Marketing Qualified), UNQUALIFIED, or DISQUALIFIED
2. Fit Summary: concise explanation
3. Key justification bullet points
4. Recommended follow-up cadence (days)
"""
        logger.info(f"[LeadQualificationAgent] Evaluating qualification for {lead_data.get('email')}")
        result = await self.llm.generate_json(prompt, system_instruction)
        return {
            "qualification_status": result.get("qualification_status", "MQL"),
            "confidence": float(result.get("confidence", 0.90)),
            "fit_summary": result.get("fit_summary", "Qualified business lead based on profile attributes."),
            "reasons": result.get("reasons", ["Matches ICP criteria", "Active buying cycle"]),
            "recommended_cadence_days": int(result.get("recommended_cadence_days", 3))
        }
