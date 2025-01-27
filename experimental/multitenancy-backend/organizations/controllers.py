from typing import List
from .models import Organization, OrganizationUser
from .schemas import (
    OrganizationCreateInput, 
    OrganizationCreateOutput,
    OrganizationOutput,
    BadRequest
)
from django.http import HttpResponse
from django.contrib.auth import get_user_model
from ninja_extra import http_get, api_controller, http_post
from ninja_jwt.authentication import JWTAuth
import uuid
from users.controllers import get_tokens_for_user


User = get_user_model()


@api_controller("/organizations", tags=["Organizations API"])
class OrganizationController:
    
    @http_post("/", response={201: OrganizationCreateOutput, 400 : BadRequest})
    def register_organization(self, request, data: OrganizationCreateInput, response: HttpResponse):
        if request.organization:
            return 400, {"message": "You are already registered in an organization"}
        
        user = User.objects.filter(email=data.work_email).first()
        if user:
            return 400, {"message": "User already exists"}
        
        subdomain = data.company_name.lower().replace(" ", "-")
        organization = Organization.objects.filter(subdomain=subdomain).first()
        if organization:
            subdomain = f"{subdomain}-{uuid.uuid4().hex[:4]}"
        
        user = User.objects.create_user(username=data.work_email, email=data.work_email, password=data.password, first_name=data.first_name, last_name=data.last_name)
        tokens = get_tokens_for_user(user)
        organization = Organization.objects.create(
            company_name=data.company_name,
            owner=user,
            subdomain=subdomain,
            status='pending',
            yearly_travel_spending=data.yearly_travel_spending,
        )
        
        organization_user = OrganizationUser.objects.create(
            organization=organization,
            user=user,
            phone_number=data.phone_number,
            job_title=data.job_title,
            role='owner'
        )
        response.set_cookie(key="refresh_token", value=tokens['refresh'], httponly=True, max_age=86400)
        return 201, {
            "user": user,
            "organization": organization,
            "role": organization_user.role,
            "tokens": tokens
        }
    
    @http_get("/", response=List[OrganizationOutput], auth=JWTAuth())
    def list_organizations(request):
        if request.user.is_superuser:
            return Organization.objects.all()
        return Organization.objects.filter(
            organizationuser__user=request.user
        )
        