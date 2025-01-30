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
    
    @http_post("/update-status/", response={200: OrganizationOutput, 403: BadRequest, 404: BadRequest, 400: BadRequest}, auth=JWTAuth())
    def update_organization_status(self, request, data: OrganizationUpdateStatusInput):
        if not request.user.is_superuser:
            return 403, {"message": "You are not authorized to update organization status"}
        try:
            organization = Organization.objects.get(id=data.org_id)
        except Organization.DoesNotExist:
            return 404, {"message": "Organization not found"}
        
        
        sorted_status = ['pending', 'test_mode', 'active', 'rejected']
        
        if data.status not in sorted_status:
            return 400, {"message": "Invalid status"}
        
        allowed_status = []
        if organization.status == 'pending':
            allowed_status = ['test_mode', 'rejected']
        elif organization.status == 'test_mode':
            allowed_status = ['active', 'rejected']
        elif organization.status == 'active':
            allowed_status = ['rejected']
        if data.status not in allowed_status:
            return 400, {"message": "Forbidden status"}
        
        if data.status == 'test_mode':
            seed_db_with_test_mode_users(organization)
        organization.status = data.status
        organization.save()
        return 200, organization
    
    @http_get("/test-mode-users/", response={200 : List[OrganizationUserOutput], 403: BadRequest, 404: BadRequest}, auth=JWTAuth())
    def get_test_mode_users(self, request, org_id: int):
        if not request.user.is_superuser:
            return 403, {"message": "You are not authorized to get test mode users"}
        
        try:
            organization = Organization.objects.get(id=org_id)
        except Organization.DoesNotExist:
            return 404, {"message": "Organization not found"}
        
        users = OrganizationUser.objects.filter(organization=organization, organization__status='test_mode')
        
        return [OrganizationUserOutput(
            id=user.id,
            first_name=user.user.first_name,
            last_name=user.user.last_name,
            email=user.user.email,
            job_title=user.job_title,
            role=user.role,
            password=f"{user.organization.subdomain}@2024"
        ) for user in users]
        
        
    @http_get("/groups/", response={200 : List[GroupOutput], 403: BadRequest, 404: BadRequest}, auth=JWTAuth())
    def get_groups(self, request, org_id: int):
        if not request.user.is_superuser:
            org_user = OrganizationUser.objects.filter(user=request.user, organization=request.organization).first()
            if not org_user or org_user.role != 'owner':
                return 403, {"message": "You are not authorized to get groups"}
        
        groups = Group.objects.filter(organization=org_id)
        employees = Employee.objects.filter(group__in=groups)
        return [GroupOutput(
            id=group.id,
            name=group.name,
            approver=group.approver,
            employees=[EmployeeOutput(
                id=employee.id,
                name=employee.name
            ) for employee in employees if employee.group == group]
        ) for group in groups]


def get_random_arabic_name():
    first_names = [
        "Mohammed", "Ahmed", "Abdullah", "Ali", "Omar", "Hassan", "Ibrahim", "Khalid", "Abdulrahman", "Yusuf",
        "Fatima", "Aisha", "Maryam", "Zainab", "Noor", "Sara", "Layla", "Huda", "Amal", "Rana", "Hasan", "Safi", "Nasser", "Ali", "Haidar", "Taher", "Laith"
    ]
    
    last_names = [
        "Al Omani", "Al Balushi", "Al Harthi", "Al Saadi", "Al Riyami", "Al Maawali", "Al Rashdi", "Al Hinai",
        "Al Maqbali", "Al Habsi", "Al Busaidi", "Al Rawahi", "Al Mamari", "Al Shekaili", "Al Ghafri", "Dayoub", "Al Shamsi"
    ]
    return (
        random.choice(first_names),
        random.choice(last_names)
    )



def seed_db_with_test_mode_users(organization: Organization):
    subdomain = organization.subdomain
    job_titles = ["Admin", "HR", "Focal Point"]
    roles = ['owner', 'hr', 'focal_point']
    names = [get_random_arabic_name() for _ in range(3)]
    owner = User.objects.create_user(
        username=f"admin@{subdomain}.app", 
        email=f"admin@{subdomain}.app", 
        password=f"{subdomain}@2024", 
        first_name=names[0][0], 
        last_name=names[0][1]
    )
    
    
    hr = User.objects.create_user(
        username=f"hr@{subdomain}.app", 
        email=f"hr@{subdomain}.app", 
        password=f"{subdomain}@2024", 
        first_name=names[1][0], 
        last_name=names[1][1]
    )
    
    focal_point = User.objects.create_user(
        username=f"focalpoint@{subdomain}.app", 
        email=f"focalpoint@{subdomain}.app", 
        password=f"{subdomain}@2024", 
        first_name=names[2][0], 
        last_name=names[2][1]
    )
    
    users = [owner, hr, focal_point]
    
    for index, user in enumerate(users):
        OrganizationUser.objects.create(
            organization=organization,
            user=user,
            job_title=job_titles[index],
            role=roles[index]
        )
    organization.owner = owner
    organization.save()
    
    Group.objects.create(
        name="Management",
        organization=organization,
        approver=owner
    )
    
    Group.objects.create(
        name="Marketing",
        organization=organization,
        approver=hr
    )
    
    Group.objects.create(
        name="Finance",
        organization=organization,
        approver=hr
    )
    
    Employee.objects.create(
        name=f"{names[0][0]} {names[0][1]}",
        group=Group.objects.get(name="Management"),
        user=owner,
        tag="Executive"
    )
    
    Employee.objects.create(
        name=f"{names[1][0]} {names[1][1]}",
        group=Group.objects.get(name="Management"),
        user=hr,
        tag="Management"
    )
    
    Employee.objects.create(
        name=f"{names[2][0]} {names[2][1]}",
        group=Group.objects.get(name="Finance"),
        user=focal_point,
        tag="normal"
    )
    
    twentry_employees = [get_random_arabic_name() for _ in range(20)]
    for employee in twentry_employees[:10]:
        Employee.objects.create(
            name=f"{employee[0]} {employee[1]}",
            group=Group.objects.get(name="Marketing"),
            tag="normal"
        )
    
    for employee in twentry_employees[10:]:
        Employee.objects.create(
            name=f"{employee[0]} {employee[1]}",
            group=Group.objects.get(name="Finance"),
            tag="Executive"
        )