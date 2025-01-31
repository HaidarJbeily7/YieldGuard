from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Report
from .services import ReportNotificationService

@receiver(post_save, sender=Report)
def handle_report_notifications(sender, instance, created, **kwargs):
    if created:
        ReportNotificationService.notify_new_report(instance)
    else:
        # If status changed, notify reporter
        if instance.tracker.has_changed('status'):
            ReportNotificationService.notify_status_change(instance) 