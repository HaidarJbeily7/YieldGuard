from django.db import models
from django.conf import settings

class Organization(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('test_mode', 'Test Mode'),
        ('active', 'Active'),
        ('rejected', 'Rejected')
    ]
    company_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES,
        default='pending'
    )
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    subdomain = models.CharField(max_length=100, unique=True)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name

class OrganizationUser(models.Model):
    ROLE_CHOICES = [
        ('owner', 'Owner'),
        ('admin', 'Admin'),
        ('member', 'Member')
    ]

    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    job_title = models.CharField(max_length=255)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['organization', 'user']