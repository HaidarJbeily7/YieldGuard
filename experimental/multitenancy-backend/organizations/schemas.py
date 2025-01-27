from ninja import Schema
from datetime import datetime
from typing import Optional
from pydantic import EmailStr
class TokenOutput(Schema):
    access: str
    refresh: str


class OrganizationCreateInput(Schema):
    first_name: str
    last_name: str
    job_title: str
    company_name: str
    work_email: EmailStr
    password: str
    phone_number: str
    yearly_travel_spending: float
    
class BadRequest(Schema):
    message: str

class OrganizationOutput(Schema):
    id: int
    company_name: str
    status: str
    yearly_travel_spending: float
    default_currency: str
    subdomain: str
    is_active: bool


class UserOutput(Schema):
    id: int
    first_name: str
    last_name: str
    email: str
    username: str

class OrganizationCreateOutput(Schema):
    user: UserOutput
    organization: OrganizationOutput
    role: str
    tokens: TokenOutput

class OrganizationUpdate(Schema):
    name: Optional[str]
    sector: Optional[str]
    contact_email: Optional[str]
    contact_phone: Optional[str]
    status: Optional[str]
    is_active: Optional[bool]
