import re

def is_valid_business_email(email: str) -> bool:
    if not email or "@" not in email:
        return False
    parts = email.split("@")
    if len(parts) != 2:
        return False
    domain = parts[1].lower()
    # Flag generic free mail domains
    free_providers = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com"]
    return domain not in free_providers

def clean_phone_number(phone: str) -> str:
    if not phone:
        return ""
    return re.sub(r"[^\d+]", "", phone)
