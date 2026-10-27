from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "AI Sales Lead Follow-Up Automation"
    API_V1_STR: str = "/api/v1"
    DEFAULT_API_KEY: str = "sales-automation-secret-key-2026"
    API_KEY_HEADER_NAME: str = "X-API-Key"
    DATABASE_URL: str = "sqlite:///./sales_automation.db"
    
    # LLM Settings
    DEFAULT_LLM_PROVIDER: str = "gemini"
    DEFAULT_LLM_MODEL: str = "gemini-2.5-flash"
    GEMINI_API_KEY: Optional[str] = None
    OPENAI_API_KEY: Optional[str] = None
    MOCK_LLM_MODE: bool = True

    # Sales / Mail Settings
    SALES_AGENT_EMAIL: str = "alex.sales@enterprise-growth.io"
    SALES_AGENT_NAME: str = "Alex Mercer"

    # Training Links
    UNCODEMY_NOIDA_COURSE: str = "https://uncodemy.com/course/automation-testing-course-in-noida"
    UNCODEMY_DELHI_COURSE: str = "https://uncodemy.com/course/automation-testing-course-in-Delhi"

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()
