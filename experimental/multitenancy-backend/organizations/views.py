from ninja import Router
from typing import List
from django.shortcuts import get_object_or_404
from .models import Organization, OrganizationUser
from .schemas import (
    OrganizationCreate, 
    OrganizationOut, 
    OrganizationUpdate,
    OrganizationUserCreate,
    OrganizationUserOut
)
from ninja.security import HttpBearer
import jwt
from django.conf import settings
from jwt.exceptions import InvalidTokenError
from django.contrib.auth import get_user_model
from functools import wraps
from ninja.responses import Response

User = get_user_model()


def organization_member_required(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not request.organization:
            return Response({"message": "Forbidden"}, status=403)
        
        if not request.user or not request.organization.organizationuser_set.filter(user=request.user).exists():
            return Response({"message": "Forbidden"}, status=403)
            
        return view_func(request, *args, **kwargs)
    return wrapper


def organization_admin_required(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not request.organization:
            return Response({"message": "Forbidden"}, status=403)
        
        if not request.user or not request.organization.organizationuser_set.filter(
            user=request.user, 
            role__in=['owner', 'admin']
        ).exists():
            return Response({"message": "Forbidden"}, status=403)
            
        return view_func(request, *args, **kwargs)
    return wrapper


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
        owner=user,
        subdomain=data.company_name.lower().replace(" ", "-"),
        status='pending'
    )
    
    # Create owner relationship
    OrganizationUser.objects.create(
        organization=organization,
        user=user,
        role='owner'
    )
    
    return 201, organization

@router.get("/", response=List[OrganizationOut], auth=JWTAuth())
@organization_member_required
def list_organizations(request):
    return Organization.objects.all()

@router.get("/{org_id}", response=OrganizationOut, auth=JWTAuth())
@organization_member_required
def get_organization(request, org_id: int):
    org = get_object_or_404(Organization, id=org_id)
    if not request.user.is_superuser and org.id != request.organization.id:
        return Response({"message": "Forbidden"}, status=403)
    return org

@router.get("/{org_id}/users", response=List[OrganizationUserOut], auth=JWTAuth())
@organization_member_required
def list_organization_users(request, org_id: int):
    org = get_object_or_404(Organization, id=org_id)
    if not request.user.is_superuser and org.id != request.organization.id:
        return Response({"message": "Forbidden"}, status=403)
    return org.organizationuser_set.all()

@router.post("/{org_id}/users", response={201: OrganizationUserOut}, auth=JWTAuth())
@organization_admin_required
def add_organization_user(request, org_id: int, data: OrganizationUserCreate):
    org = get_object_or_404(Organization, id=org_id)
    if not request.user.is_superuser and org.id != request.organization.id:
        return Response({"message": "Forbidden"}, status=403)
        
    try:
        user = User.objects.get(email=data.email)
    except User.DoesNotExist:
        user = User.objects.create(
            email=data.email,
            username=data.email
        )
        
    org_user = OrganizationUser.objects.create(
        organization=org,
        user=user,
        role=data.role,
        metadata=data.metadata
    )
    
    return 201, org_user
