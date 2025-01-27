from ninja import Schema
from typing import Optional
from organizations.schemas import OrganizationOutput, UserOutput

class UserLogout(Schema):
    refresh: str


class OrganizationUserDetails(Schema):
    organization: OrganizationOutput
    role: str
    job_title: str
    phone_number: str
    

class UserInfo(Schema):
    user: UserOutput
    organization_user_details: Optional[OrganizationUserDetails]