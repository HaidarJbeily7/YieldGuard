from ninja import Router
from typing import List
from django.shortcuts import get_object_or_404
from .models import Organization, OrganizationUser
from .schemas import (
    OrganizationCreate, 
    OrganizationOut, 
    OrganizationUpdate,
)
from ninja.security import HttpBearer
import jwt
from django.conf import settings
from jwt.exceptions import InvalidTokenError
from django.contrib.auth import get_user_model

User = get_user_model()


class JWTAuth(HttpBearer):
    def authenticate(self, request, token):
        try:
            decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            username = decoded_token.get("username")
            if username:
                try:
                    user = User.objects.get(username=username)
                    return user
                except User.DoesNotExist:
                    return None
        except InvalidTokenError:
            return None

router = Router()

@router.post("/", response={201: OrganizationOut})
def register_organization(request, data: OrganizationCreate):
    # Create user if not exists
    try:
        user = User.objects.get(email=data.work_email)
    except User.DoesNotExist:
        user = User.objects.create(
            email=data.work_email,
            first_name=data.first_name,
            last_name=data.last_name,
            username=data.work_email 
        )

    organization = Organization.objects.create(
        company_name=data.company_name,
        phone_number=data.phone_number,
        owner=user,
        subdomain=data.company_name.lower().replace(" ", "-"),
        status='pending'
    )
    
    # Create owner relationship
    OrganizationUser.objects.create(
        organization=organization,
        user=user,
        job_title=data.job_title,
        role='owner'
    )
    
    return 201, organization

@router.get("/", response=List[OrganizationOut], auth=JWTAuth())
def list_organizations(request):
    if request.user.is_superuser:
        return Organization.objects.all()
    return Organization.objects.filter(
        organizationuser__user=request.user
    )

@router.get("/{org_id}", response=OrganizationOut, auth=JWTAuth())
def get_organization(request, org_id: int):
    org = get_object_or_404(Organization, id=org_id)
    if not (request.user.is_superuser or 
            org.organizationuser_set.filter(user=request.user).exists()):
        return 403, {"message": "Permission denied"}
    return org

@router.put("/{org_id}", response=OrganizationOut, auth=JWTAuth())
def update_organization(request, org_id: int, data: OrganizationUpdate):
    org = get_object_or_404(Organization, id=org_id)
    
    # Check permissions
    if not (request.user.is_superuser or 
            org.organizationuser_set.filter(
                user=request.user, 
                role__in=['owner', 'admin']
            ).exists()):
        return 403, {"message": "Permission denied"}
    
    for attr, value in data.dict(exclude_unset=True).items():
        setattr(org, attr, value)
    org.save()
    return org
