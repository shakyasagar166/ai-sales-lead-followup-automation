from typing import Dict, Any, Optional
from app.integrations.llm_client import LLMClient
from app.core.logging_config import logger

class MessageGenerationAgent:
    """Drafts personalized, high-conversion sales outreach and follow-up emails."""

    def __init__(self, llm_client: Optional[LLMClient] = None):
        self.llm = llm_client or LLMClient()

    async def generate_message(
        self,
        lead_data: Dict[str, Any],
        sequence_step: int = 1,
        channel: str = "EMAIL",
        tone: str = "Persuasive & Professional",
        objective: str = "Book Discovery Call"
    ) -> Dict[str, Any]:
        system_instruction = (
            "You are a top 1% B2B Sales Development Copywriter. Craft personalized, concise, value-packed "
            "cold outreach or follow-up messaging that sparks genuine curiosity and high response rates. Output strictly JSON."
        )

        prompt = f"""
Prospect Profile:
- Name: {lead_data.get('first_name')} {lead_data.get('last_name', '')}
- Title: {lead_data.get('job_title', 'Leader')}
- Company: {lead_data.get('company', 'Company')}
- Industry: {lead_data.get('industry', 'Tech')}
- Sequence Step: {sequence_step}
- Target Channel: {channel}
- Preferred Tone: {tone}
- Outreach Objective: {objective}

Generate:
{{
  "subject": "Compelling subject line under 9 words",
  "preview_text": "Short preheader preview",
  "body": "Formatted email body with custom placeholders and clear call-to-action",
  "call_to_action": "Specific CTA",
  "estimated_read_time_seconds": 30
}}
"""
        logger.info(f"[MessageGenerationAgent] Generating step {sequence_step} outreach for {lead_data.get('email')}")
        result = await self.llm.generate_json(prompt, system_instruction)
        return {
            "subject": result.get("subject", f"Quick question for {lead_data.get('first_name', 'there')}"),
            "preview_text": result.get("preview_text", "Thought you might find this valuable..."),
            "body": result.get("body", "Hi, following up on our previous conversation..."),
            "call_to_action": result.get("call_to_action", objective),
            "estimated_read_time_seconds": int(result.get("estimated_read_time_seconds", 35))
        }
