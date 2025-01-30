from ninja import Schema
from typing import Optional
from organizations.schemas import OrganizationOutput, UserOutput

class UserLogout(Schema):
    refresh: str


class OrganizationUserDetails(Schema):
    organization: OrganizationOutput
    role: str
    job_title: str
    

class UserInfo(Schema):
    id: int
    first_name: str
    last_name: str
    email: str
    is_superuser: bool
    role: Optional[str]
    job_title: Optional[str]
    organization: Optional[OrganizationOutput]