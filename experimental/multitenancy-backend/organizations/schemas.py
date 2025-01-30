from ninja import Schema
from datetime import datetime
from typing import Optional
from pydantic import EmailStr, Field
from typing import List

class OrganizationCreateInput(Schema):
    first_name: str
    last_name: str
    job_title: str
    company_name: str
    work_email: EmailStr
    phone_number: str
    yearly_travel_spending: float
    
class BadRequest(Schema):
    message: str

class ApplicantOutput(Schema):
    id: int
    name: str
    email: str
    job_title: str
    phone_number: str


class OrganizationOutput(Schema):
    id: int
    company_name: str
    status: str
    yearly_travel_spending: float
    default_currency: str
    subdomain: str
    applicant: ApplicantOutput


class UserOutput(Schema):
    id: int
    first_name: str
    last_name: str
    email: str
    username: str
    is_superuser: bool

class OrganizationCreateOutput(Schema):
    user: UserOutput
    organization: OrganizationOutput
    role: str

class OrganizationUpdate(Schema):
    name: Optional[str]
    sector: Optional[str]
    contact_email: Optional[str]
    contact_phone: Optional[str]
    status: Optional[str]
    is_active: Optional[bool]



class OrganizationUserOutput(Schema):
    id: int
    first_name: str
    last_name: str
    email: str
    job_title: str
    role: str
    password: str

class OrganizationUpdateStatusInput(Schema):
    org_id: int
    status: str = Field(..., description="Organization status", enum=["pending", "test_mode", "active", "rejected"])

class EmployeeOutput(Schema):
    id: int
    name: str
    
    
class GroupOutput(Schema):
    id: int
    name: str
    approver: OrganizationUserOutput
    employees: List[EmployeeOutput]
    
