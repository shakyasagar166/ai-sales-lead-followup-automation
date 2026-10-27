from app.schemas.lead import LeadCreate, LeadUpdate, LeadResponse, InteractionCreate, InteractionResponse
from app.schemas.followup import FollowUpCreate, FollowUpUpdate, FollowUpResponse, GenerateMessageRequest
from app.schemas.campaign import CampaignCreate, CampaignUpdate, CampaignResponse

__all__ = [
    "LeadCreate", "LeadUpdate", "LeadResponse",
    "InteractionCreate", "InteractionResponse",
    "FollowUpCreate", "FollowUpUpdate", "FollowUpResponse", "GenerateMessageRequest",
    "CampaignCreate", "CampaignUpdate", "CampaignResponse"
]
