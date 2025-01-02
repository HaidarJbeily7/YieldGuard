from ninja import Schema
from datetime import datetime
from typing import Optional

class OrganizationCreate(Schema):
    first_name: str
    last_name: str
    job_title: str
    company_name: str
    work_email: str
    phone_number: str
    yearly_travel_spending: float

class OrganizationOut(Schema):
    id: int
    name: str
    sector: str
    registration_number: str
    contact_email: str
    contact_phone: str
    status: str
    created_at: datetime
    subdomain: str
    is_active: bool

class OrganizationUpdate(Schema):
    name: Optional[str]
    sector: Optional[str]
    contact_email: Optional[str]
    contact_phone: Optional[str]
    status: Optional[str]
    is_active: Optional[bool]
