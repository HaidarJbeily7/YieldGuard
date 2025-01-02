from django.core.mail import send_mail
from django.conf import settings

class OrganizationService:
    @staticmethod
    def process_registration(organization):        
        send_mail(
            'Registration Confirmation',
            f'Thank you for registering {organization.name}. '
            'Your application is under review.',
            settings.DEFAULT_FROM_EMAIL,
            [organization.contact_email],
            fail_silently=False,
        )
        return organization

    @staticmethod
    def activate_test_mode(organization):
        if organization.status != 'pending':
            raise ValueError('Invalid status transition')
            
        organization.status = 'test_mode'
        organization.save()
        
        # Send notification
        send_mail(
            'Test Mode Activated',
            f'Test mode has been activated for {organization.name}.',
            settings.DEFAULT_FROM_EMAIL,
            [organization.contact_email],
            fail_silently=False,
        )
        return organization

    @staticmethod
    def activate_organization(organization):
        organization.status = 'active'
        organization.is_active = True
        organization.save()
        
        # Send notification
        send_mail(
            'Organization Activated',
            f'Your organization {organization.name} has been activated.',
            settings.DEFAULT_FROM_EMAIL,
            [organization.contact_email],
            fail_silently=False,
        )
        return organization