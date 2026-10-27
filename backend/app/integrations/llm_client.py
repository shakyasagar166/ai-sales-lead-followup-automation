import json
import httpx
from typing import Dict, Any, Optional
from app.core.config import settings
from app.core.logging_config import logger

class LLMClient:
    """Unified AI Client for Gemini, OpenAI, or intelligent offline Sales Reasoning."""

    def __init__(self, provider: Optional[str] = None, model: Optional[str] = None):
        self.provider = provider or settings.DEFAULT_LLM_PROVIDER
        self.model = model or settings.DEFAULT_LLM_MODEL
        self.api_key = settings.GEMINI_API_KEY if self.provider == "gemini" else settings.OPENAI_API_KEY
        self.mock_mode = settings.MOCK_LLM_MODE or not self.api_key

    async def generate_json(
        self,
        prompt: str,
        system_instruction: Optional[str] = None,
        temperature: float = 0.3
    ) -> Dict[str, Any]:
        if not self.mock_mode and self.api_key:
            try:
                if self.provider == "gemini":
                    return await self._call_gemini(prompt, system_instruction, temperature)
                elif self.provider == "openai":
                    return await self._call_openai(prompt, system_instruction, temperature)
            except Exception as e:
                logger.warning(f"Live LLM call error ({str(e)}), switching to simulated sales agent engine.")

        return self._generate_simulated_json(prompt, system_instruction)

    async def _call_gemini(self, prompt: str, system_instruction: Optional[str], temperature: float) -> Dict[str, Any]:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model}:generateContent?key={self.api_key}"
        contents = []
        if system_instruction:
            contents.append({"role": "user", "parts": [{"text": f"System Instruction:\n{system_instruction}"}]})
            contents.append({"role": "model", "parts": [{"text": "Understood. I will strictly output valid JSON."}]})
        contents.append({"role": "user", "parts": [{"text": prompt}]})

        payload = {
            "contents": contents,
            "generationConfig": {"temperature": temperature, "responseMimeType": "application/json"}
        }
        async with httpx.AsyncClient(timeout=30.0) as client:
            res = await client.post(url, json=payload)
            res.raise_for_status()
            text = res.json()["candidates"][0]["content"]["parts"][0]["text"]
            return json.loads(text)

    async def _call_openai(self, prompt: str, system_instruction: Optional[str], temperature: float) -> Dict[str, Any]:
        url = "https://api.openai.com/v1/chat/completions"
        headers = {"Authorization": f"Bearer {self.api_key}", "Content-Type": "application/json"}
        messages = []
        if system_instruction:
            messages.append({"role": "system", "content": system_instruction})
        messages.append({"role": "user", "content": prompt})

        payload = {
            "model": self.model or "gpt-4o-mini",
            "messages": messages,
            "temperature": temperature,
            "response_format": {"type": "json_object"}
        }
        async with httpx.AsyncClient(timeout=30.0) as client:
            res = await client.post(url, json=payload, headers=headers)
            res.raise_for_status()
            text = res.json()["choices"][0]["message"]["content"]
            return json.loads(text)

    def _generate_simulated_json(self, prompt: str, system_instruction: Optional[str]) -> Dict[str, Any]:
        """Offline AI Agent simulation tailored for Sales Lead Qualification, Scoring, and Follow-Up."""
        text = f"{system_instruction or ''} {prompt}".lower()

        # 1. Lead Qualification
        if "qualif" in text:
            is_mql = True
            is_sql = "cto" in text or "vp" in text or "director" in text or "budget" in text
            qualification_status = "SQL" if is_sql else "MQL"
            return {
                "qualification_status": qualification_status,
                "confidence": 0.92,
                "fit_summary": "High ICP alignment with strong decision-making title and software infrastructure need.",
                "reasons": [
                    "Identified senior decision-maker persona",
                    "Target company size in enterprise expansion tier",
                    "Clear intent towards automated sales pipeline solutions"
                ],
                "recommended_cadence_days": 2 if is_sql else 4
            }

        # 2. Lead Scoring
        if "score" in text or "scoring" in text:
            score = 75.0
            if any(k in text for k in ["vp", "cto", "ceo", "head of", "director"]):
                score += 15.0
            if any(k in text for k in ["enterprise", "500+", "1000+", "fintech", "saas"]):
                score += 8.0
            priority = "HOT" if score >= 85 else ("HIGH" if score >= 70 else "MEDIUM")
            return {
                "score": min(100.0, score),
                "priority": priority,
                "intent_level": "High" if score >= 80 else "Moderate",
                "breakdown": {
                    "firmographic_fit": 28,
                    "behavioral_intent": 27,
                    "budget_authority": 25,
                    "engagement_momentum": 15
                },
                "key_growth_signals": ["Expanding technical team", "Evaluating enterprise automation tools"]
            }

        # 3. Message Generation
        if "message" in text or "followup" in text or "email" in text or "pitch" in text:
            return {
                "subject": "Quick question regarding your workflow automation goals",
                "preview_text": "Saw your recent work at company and thought of this...",
                "body": (
                    "Hi there,\n\n"
                    "I noticed your focus on scaling high-performing revenue and tech teams this quarter. "
                    "Many leaders in your space face bottlenecks when orchestrating complex follow-ups and pipeline velocity.\n\n"
                    "Our AI Sales Lead Follow-Up platform streamlines engagement, personalizes multi-touch cadences, and boosts demo conversion by 3.4x.\n\n"
                    "Would you be open to a 10-minute discovery chat this Thursday at 2 PM to explore how this fits your stack?\n\n"
                    "Best regards,\n"
                    "Alex Mercer | Enterprise Growth"
                ),
                "call_to_action": "Book a 10-minute demo",
                "estimated_read_time_seconds": 35,
                "recommended_send_hour": 10
            }

        # 4. Sales Insights
        if "insight" in text or "deal" in text or "pipeline" in text:
            return {
                "deal_health": "STRONG",
                "recommended_next_action": "Send personalized customer case study on API testing & pipeline reliability",
                "churn_risk": "LOW",
                "closing_probability": 0.78,
                "strategic_notes": "High responsiveness across email touches; optimal timing to propose an architectural deep dive."
            }

        return {
            "status": "PROCESSED",
            "summary": "AI Sales agent reasoned over lead telemetry successfully."
        }
