from ninja import Schema
from datetime import datetime
from typing import Optional

class OrganizationCreate(Schema):
    subdomain: str
    owner_id: int

class OrganizationOut(Schema):
    id: int
    status: str
    owner_id: int
    subdomain: str
    is_active: bool
    created_at: datetime
    updated_at: datetime

class OrganizationUpdate(Schema):
    status: Optional[str]
    is_active: Optional[bool]

class OrganizationUserCreate(Schema):
    email: str
    role: str
    metadata: dict = {}

class OrganizationUserOut(Schema):
    id: int
    organization_id: int
    user_id: int
    role: str
    metadata: dict
    created_at: datetime
    updated_at: datetime
