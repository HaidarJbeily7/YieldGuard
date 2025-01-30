from django.db import models
from django.conf import settings

class Applicant(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    job_title = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Organization(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('test_mode', 'Test Mode'),
        ('active', 'Active'),
        ('rejected', 'Rejected')
    ]
    company_name = models.CharField(max_length=255)
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES,
        default='pending'
    )
    yearly_travel_spending = models.FloatField(default=0)
    default_currency = models.CharField(max_length=3, default='OMR')
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    applicant = models.ForeignKey(Applicant, on_delete=models.CASCADE, null=True)
    subdomain = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.company_name


class OrganizationUser(models.Model):
    ROLE_CHOICES = [
        ('owner', 'Owner'),
        ('hr', 'HR'),
        ('focal_point', 'Focal Point')
    ]
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    job_title = models.CharField(max_length=255)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email} - {self.organization.company_name} - {self.user.get_full_name()}"
    
    class Meta:
        unique_together = ['organization', 'user']
        
class Group(models.Model):
    name = models.CharField(max_length=255)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    approver = models.ForeignKey(OrganizationUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
    
class Employee(models.Model):
    name = models.CharField(max_length=255)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    tag = models.CharField(max_length=255, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.user.email
    
class CostCenter(models.Model):
    name = models.CharField(max_length=255)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
    
class Policy(models.Model):
    name = models.CharField(max_length=255)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
    
class OrganizationSettings(models.Model):
    GROUP_VISIBILITY_CHOICES = [
        ('all', 'All'),
        ('private', 'Private')
    ]
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    group_visibility = models.CharField(max_length=20, choices=GROUP_VISIBILITY_CHOICES, default='all')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.organization.company_name