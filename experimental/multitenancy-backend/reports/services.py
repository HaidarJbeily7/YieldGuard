from django.core.mail import send_mail
from django.conf import settings
from .models import Report

class ReportNotificationService:
    @staticmethod
    def notify_new_report(report: Report):
        # Notify administrators
        admin_emails = report.organization.organizationuser_set.filter(
            role='owner'
        ).values_list('user__email', flat=True)

        send_mail(
            subject=f'New Suspicious Activity Report #{report.id}',
            message=f'''
A new suspicious activity report has been submitted:

Title: {report.title}
Severity: {report.severity}
Reporter: {report.reporter.email}
Description: {report.description}

Please login to review this report.
            ''',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=list(admin_emails),
            fail_silently=False,
        )

    @staticmethod
    def notify_status_change(report: Report):
        send_mail(
            subject=f'Report #{report.id} Status Updated',
            message=f'''
The status of your report has been updated:

Title: {report.title}
New Status: {report.status}
Resolution Notes: {report.resolution_notes or 'N/A'}

Please login to view the full details.
            ''',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[report.reporter.email],
            fail_silently=False,
        ) 