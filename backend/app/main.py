from contextlib import asynccontextmanager
from datetime import datetime, timedelta
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.logging_config import logger
from app.db.database import init_db, SessionLocal
from app.api.v1 import api_v1_router
from app.models.lead import Lead
from app.models.followup import FollowUp
from app.models.interaction import Interaction
from app.models.campaign import Campaign
from app.models.user import User

def seed_demo_sales_data():
    db: Session = SessionLocal()
    try:
        if db.query(Lead).count() == 0:
            logger.info("Seeding initial B2B sales leads, multi-touch follow-ups, and campaigns...")

            # 1. Rep User
            rep = User(name="Alex Mercer", email="alex.sales@enterprise-growth.io", role="Account Executive")
            db.add(rep)
            db.commit()

            # 2. Leads
            l1 = Lead(
                first_name="Marcus",
                last_name="Vance",
                email="marcus.vance@cloudscale-tech.io",
                phone="+1 (415) 890-2134",
                company="CloudScale Tech",
                job_title="VP of Infrastructure & Engineering",
                industry="Cloud & DevSecOps",
                company_size="250-500",
                budget=45000.0,
                status="QUALIFIED",
                qualification_status="SQL",
                score=92.0,
                priority="HOT",
                intent_level="High",
                source="Inbound Web Form",
                notes="Urgent need for automated regression testing and workflow orchestrations.",
                assigned_to="Alex Mercer"
            )

            l2 = Lead(
                first_name="Elena",
                last_name="Rostova",
                email="elena.r@finnovate-payments.com",
                phone="+1 (212) 555-8931",
                company="Finnovate Global",
                job_title="Director of QA & Automation Engineering",
                industry="FinTech",
                company_size="500-1000",
                budget=80000.0,
                status="NEW",
                qualification_status="SQL",
                score=88.5,
                priority="HOT",
                intent_level="High",
                source="Executive Webinar",
                notes="Evaluating Cypress, Selenium, and AI automated testing frameworks for payment settlement pipelines.",
                assigned_to="Alex Mercer"
            )

            l3 = Lead(
                first_name="David",
                last_name="Chen",
                email="d.chen@apexlogistics.net",
                phone="+1 (312) 441-0982",
                company="Apex Logistics",
                job_title="Head of Digital Transformation",
                industry="Supply Chain",
                company_size="100-250",
                budget=20000.0,
                status="CONTACTED",
                qualification_status="MQL",
                score=68.0,
                priority="MEDIUM",
                intent_level="Moderate",
                source="LinkedIn Outreach",
                notes="Interested in reducing manual follow-up overhead and customer communication lag.",
                assigned_to="Alex Mercer"
            )

            db.add_all([l1, l2, l3])
            db.commit()
            db.refresh(l1)
            db.refresh(l2)
            db.refresh(l3)

            # 3. Follow-Ups for Lead 1
            now = datetime.utcnow()
            fu1 = FollowUp(
                lead_id=l1.id,
                sequence_step=1,
                title="Introductory Value Architecture & Case Study",
                channel="EMAIL",
                scheduled_at=now - timedelta(days=1),
                status="COMPLETED",
                generated_subject="Scaling CloudScale Tech's automated pipeline with multi-agent velocity",
                generated_body=(
                    "Hi Marcus,\n\n"
                    "Noticed your recent expansion of CloudScale's cloud deployment clusters. "
                    "Teams scaling rapidly often face bottlenecks with regression verification and lead handoffs.\n\n"
                    "Our platform automates multi-stage workflows and guarantees 99.8% precision. "
                    "Would you be open to a 10-minute discovery chat this Thursday?\n\n"
                    "Best regards,\nAlex Mercer"
                ),
                sent_at=now - timedelta(days=1),
                is_automated=True
            )

            fu2 = FollowUp(
                lead_id=l1.id,
                sequence_step=2,
                title="Engineering ROI & Test Automation Benchmark",
                channel="EMAIL",
                scheduled_at=now + timedelta(days=2),
                status="PENDING",
                generated_subject="Quick follow-up: CloudScale pipeline conversion benchmarks",
                generated_body=(
                    "Hi Marcus,\n\n"
                    "Sharing a quick benchmark note: enterprise infrastructure teams reduced manual triage overhead by 68% "
                    "following automated cadence adoption.\n\n"
                    "Are you free for a quick 10-minute sync to explore this?\n\n"
                    "Cheers,\nAlex Mercer"
                ),
                is_automated=True
            )

            # Follow-Up for Lead 2
            fu3 = FollowUp(
                lead_id=l2.id,
                sequence_step=1,
                title="FinTech Test Automation & QA Reliability Brief",
                channel="EMAIL",
                scheduled_at=now + timedelta(hours=4),
                status="PENDING",
                generated_subject="High-velocity QA test automation for Finnovate Global",
                generated_body=(
                    "Hi Elena,\n\n"
                    "Thank you for attending our recent executive session. "
                    "Given Finnovate's focus on mission-critical payment settlement reliability, "
                    "I wanted to share our latest framework on automated end-to-end API and UI validation.\n\n"
                    "Would you be available for a brief discussion this Friday?\n\n"
                    "Warm regards,\nAlex Mercer"
                ),
                is_automated=True
            )

            db.add_all([fu1, fu2, fu3])

            # 4. Initial Interactions
            int1 = Interaction(
                lead_id=l1.id,
                channel="EMAIL",
                direction="OUTBOUND",
                subject=fu1.generated_subject,
                content=fu1.generated_body,
                outcome="DELIVERED"
            )
            int2 = Interaction(
                lead_id=l1.id,
                channel="EMAIL",
                direction="INBOUND",
                subject="Re: Scaling CloudScale Tech's automated pipeline",
                content="Thanks Alex, looks interesting. Can you send over a brief architecture diagram first?",
                outcome="REPLIED",
                sentiment="Positive"
            )
            db.add_all([int1, int2])

            # 5. Campaign
            c1 = Campaign(
                name="Q4 Enterprise Infrastructure & DevOps Cadence",
                description="Targeted 4-touch outreach for VP/Director engineering leads in Cloud, FinTech, and SaaS.",
                target_segment="Enterprise Tech",
                channel="EMAIL",
                status="ACTIVE",
                cadence_days=3,
                total_leads=48,
                open_rate=54.2,
                reply_rate=28.6,
                conversion_rate=18.4,
                steps_config=[
                    {"step": 1, "day": 1, "channel": "EMAIL", "topic": "Value Proposition"},
                    {"step": 2, "day": 4, "channel": "EMAIL", "topic": "Engineering Case Study"},
                    {"step": 3, "day": 7, "channel": "LINKEDIN", "topic": "Multi-Channel Touch"},
                    {"step": 4, "day": 11, "channel": "EMAIL", "topic": "Discovery Call Invitation"}
                ]
            )
            db.add(c1)
            db.commit()
            logger.info("Demo B2B sales data successfully populated.")
    finally:
        db.close()

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    seed_demo_sales_data()
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Enterprise Multi-Agent Sales Lead Follow-Up, Qualification & Pipeline Velocity System",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_v1_router, prefix=settings.API_V1_STR)

@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "timestamp": datetime.utcnow().isoformat(),
        "uncodemy_courses": {
            "noida": settings.UNCODEMY_NOIDA_COURSE,
            "delhi": settings.UNCODEMY_DELHI_COURSE
        }
    }
