from ninja import Schema
from datetime import datetime
from typing import Optional, List
from pydantic import EmailStr

class ReportCreateInput(Schema):
    title: str
    description: str
    severity: str
    related_transaction: Optional[str]

class ReportCommentInput(Schema):
    comment: str
    is_internal: bool = False

class ReportEvidenceOutput(Schema):
    id: int
    file_url: str
    description: str
    uploaded_at: datetime

class ReportCommentOutput(Schema):
    id: int
    comment: str
    user_email: str
    created_at: datetime
    is_internal: bool

class ReportOutput(Schema):
    id: int
    title: str
    description: str
    status: str
    severity: str
    reported_at: datetime
    resolved_at: Optional[datetime]
    reporter_email: str
    assigned_to_email: Optional[str]
    resolution_notes: Optional[str]
    related_transaction: Optional[str]
    evidence: List[ReportEvidenceOutput]
    comments: List[ReportCommentOutput]

class ReportUpdateInput(Schema):
    status: Optional[str]
    severity: Optional[str]
    assigned_to_id: Optional[int]
    resolution_notes: Optional[str] 