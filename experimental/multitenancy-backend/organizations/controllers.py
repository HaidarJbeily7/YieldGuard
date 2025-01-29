from typing import List
from .models import Organization, Applicant, OrganizationUser, Group, Employee
from .schemas import (
    OrganizationCreateInput, 
    OrganizationOutput,
    OrganizationUpdateStatusInput,
    OrganizationUserOutput,
    BadRequest,
    GroupOutput,
    EmployeeOutput
)
from django.contrib.auth import get_user_model
from ninja_extra import http_get, api_controller, http_post
from ninja_jwt.authentication import JWTAuth
import uuid
import random
    
User = get_user_model()


@api_controller("/organizations", tags=["Organizations API"])
class OrganizationController:
    
    @http_post("/", response={201: dict, 400 : BadRequest})
    def register_organization(self, request, data: OrganizationCreateInput):
        if request.organization:
            return 400, {"message": "You are already registered in an organization"}
        
        applicant = Applicant.objects.filter(email=data.work_email).first()
        if applicant:
            return 400, {"message": "You are already registered in an organization"}
        
        subdomain = data.company_name.lower().replace(" ", "-")
        organization = Organization.objects.filter(subdomain=subdomain).first()
        if organization:
            subdomain = f"{subdomain}-{uuid.uuid4().hex[:4]}"
        
        applicant = Applicant.objects.create(
            email=data.work_email,
            name=f'{data.first_name} {data.last_name}',
            phone_number=data.phone_number,
            job_title=data.job_title,
        )
        
        organization = Organization.objects.create(
            company_name=data.company_name,
            subdomain=subdomain,
            status='pending',
            yearly_travel_spending=data.yearly_travel_spending,
            applicant=applicant
        )
        
        return 201, {
            "message": "Organization created successfully",
        }
    
    @http_get("/", response=List[OrganizationOutput], auth=JWTAuth())
    def list_organizations(self, request):
        if request.user.is_superuser:
            return Organization.objects.all()
        return Organization.objects.filter(
            organizationuser__user=request.user
        )
        