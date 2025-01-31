from ninja_extra import api_controller, http_get, http_post, http_put
from ninja_jwt.authentication import JWTAuth
from typing import List
from django.shortcuts import get_object_or_404
from django.utils import timezone
from .models import Report, ReportComment, ReportEvidence
from .schemas import (
    ReportCreateInput, ReportOutput, ReportUpdateInput,
    ReportCommentInput, ReportCommentOutput
)

@api_controller("/reports", tags=["Reports API"])
class ReportController:
    @http_post("/", auth=JWTAuth(), response={201: ReportOutput, 400: dict})
    def create_report(self, request, data: ReportCreateInput):
        if not request.organization:
            return 400, {"message": "Organization not found"}

        report = Report.objects.create(
            reporter=request.user,
            organization=request.organization,
            title=data.title,
            description=data.description,
            severity=data.severity,
            related_transaction=data.related_transaction,
            ip_address=request.META.get('REMOTE_ADDR')
        )
        
        return 201, self._format_report_output(report)

    @http_get("/", auth=JWTAuth(), response=List[ReportOutput])
    def list_reports(self, request):
        reports = Report.objects.filter(organization=request.organization)
        return [self._format_report_output(report) for report in reports]

    @http_get("/{report_id}", auth=JWTAuth(), response={200: ReportOutput, 404: dict})
    def get_report(self, request, report_id: int):
        report = get_object_or_404(Report, id=report_id, organization=request.organization)
        return 200, self._format_report_output(report)

    @http_put("/{report_id}", auth=JWTAuth(), response={200: ReportOutput, 404: dict})
    def update_report(self, request, report_id: int, data: ReportUpdateInput):
        report = get_object_or_404(Report, id=report_id, organization=request.organization)
        
        if data.status:
            report.status = data.status
            if data.status == 'resolved':
                report.resolved_at = timezone.now()
        
        if data.severity:
            report.severity = data.severity
            
        if data.assigned_to_id:
            report.assigned_to_id = data.assigned_to_id
            
        if data.resolution_notes:
            report.resolution_notes = data.resolution_notes
            
        report.save()
        return 200, self._format_report_output(report)

    @http_post("/{report_id}/comments", auth=JWTAuth(), response={201: ReportCommentOutput, 404: dict})
    def add_comment(self, request, report_id: int, data: ReportCommentInput):
        report = get_object_or_404(Report, id=report_id, organization=request.organization)
        
        comment = ReportComment.objects.create(
            report=report,
            user=request.user,
            comment=data.comment,
            is_internal=data.is_internal
        )
        
        return 201, self._format_comment_output(comment)

    def _format_report_output(self, report: Report) -> ReportOutput:
        return ReportOutput(
            id=report.id,
            title=report.title,
            description=report.description,
            status=report.status,
            severity=report.severity,
            reported_at=report.reported_at,
            resolved_at=report.resolved_at,
            reporter_email=report.reporter.email,
            assigned_to_email=report.assigned_to.email if report.assigned_to else None,
            resolution_notes=report.resolution_notes,
            related_transaction=report.related_transaction,
            evidence=[self._format_evidence_output(e) for e in report.evidence.all()],
            comments=[self._format_comment_output(c) for c in report.comments.all()]
        )

    def _format_comment_output(self, comment: ReportComment) -> ReportCommentOutput:
        return ReportCommentOutput(
            id=comment.id,
            comment=comment.comment,
            user_email=comment.user.email,
            created_at=comment.created_at,
            is_internal=comment.is_internal
        ) 