from django.db import models
from django.conf import settings
from organizations.models import Organization

class Report(models.Model):
    REPORT_STATUS = [
        ('pending', 'Pending'),
        ('investigating', 'Under Investigation'),
        ('resolved', 'Resolved'),
        ('dismissed', 'Dismissed')
    ]

    SEVERITY_LEVELS = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical')
    ]

    reporter = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='submitted_reports')
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    reported_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=REPORT_STATUS, default='pending')
    severity = models.CharField(max_length=20, choices=SEVERITY_LEVELS, default='medium')
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='assigned_reports'
    )
    resolution_notes = models.TextField(blank=True, null=True)
    resolved_at = models.DateTimeField(null=True, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    related_transaction = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"Report #{self.id} - {self.title}"

class ReportEvidence(models.Model):
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name='evidence')
    file = models.FileField(upload_to='report_evidence/%Y/%m/%d/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"Evidence for Report #{self.report.id}"

class ReportComment(models.Model):
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_internal = models.BooleanField(default=False)

    def __str__(self):
        return f"Comment on Report #{self.report.id} by {self.user.email}"
