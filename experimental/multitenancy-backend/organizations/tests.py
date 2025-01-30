from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from .models import Organization, OrganizationUser, Applicant
import json
from django.contrib.auth.models import Group

User = get_user_model()

class OrganizationTests(TestCase):
    def setUp(self):
        self.client = Client()
        
    def test_register_organization_success(self):
        data = {
            "company_name": "Test Company",
            "work_email": "test@example.com", 
            "password": "testpass123",
            "first_name": "Test",
            "last_name": "User",
            "phone_number": "1234567890",
            "job_title": "Manager",
            "yearly_travel_spending": 10000
        }
        
        response = self.client.post('/api/organizations/', 
                                  data=json.dumps(data),
                                  content_type='application/json')
        
        self.assertEqual(response.status_code, 201)
        self.assertTrue(Organization.objects.filter(company_name="Test Company").exists())
        org = Organization.objects.get(company_name="Test Company")
        self.assertEqual(org.status, 'pending')
        self.assertTrue(Applicant.objects.filter(email="test@example.com").exists())
        
    def test_register_organization_existing_applicant(self):
        # Create existing applicant
        Applicant.objects.create(
            email="test@example.com",
            name="Test User",
            phone_number="1234567890",
            job_title="Manager"
        )
        
        data = {
            "company_name": "Test Company",
            "work_email": "test@example.com",
            "password": "testpass123",
            "first_name": "Test",
            "last_name": "User",
            "phone_number": "1234567890",
            "job_title": "Manager",
            "yearly_travel_spending": 10000
        }
        
        response = self.client.post('/api/organizations/',
                                  data=json.dumps(data),
                                  content_type='application/json')
                                  
        self.assertEqual(response.status_code, 400)
        self.assertEqual(json.loads(response.content),
                        {"message": "You are already registered in an organization"})

    def test_update_organization_status(self):
        # Create superuser
        superuser = User.objects.create_superuser(
            username="admin@example.com",
            email="admin@example.com",
            password="admin123"
        )
        
        # Create organization
        org = Organization.objects.create(
            company_name="Test Company",
            subdomain="test-company",
            status='pending'
        )
        
        # Login as superuser
        self.client.force_login(superuser)
        
        # Update to test_mode
        response = self.client.post('/api/organizations/update-status/',
                                  data=json.dumps({
                                      "org_id": org.id,
                                      "status": "test_mode"
                                  }),
                                  content_type='application/json')
        
        self.assertEqual(response.status_code, 200)
        org.refresh_from_db()
        self.assertEqual(org.status, 'test_mode')
        
        # Verify test users were created
        self.assertTrue(User.objects.filter(email=f"admin@test-company.app").exists())
        self.assertTrue(User.objects.filter(email=f"hr@test-company.app").exists())
        self.assertTrue(User.objects.filter(email=f"focalpoint@test-company.app").exists())
        
        # Verify groups were created
        self.assertTrue(Group.objects.filter(name="Management").exists())
        self.assertTrue(Group.objects.filter(name="Marketing").exists())
        self.assertTrue(Group.objects.filter(name="Finance").exists())

    def test_list_organizations(self):
        # Create superuser
        superuser = User.objects.create_superuser(
            username="admin@example.com",
            email="admin@example.com",
            password="admin123"
        )
        
        # Create regular user
        user = User.objects.create_user(
            username="user@example.com",
            email="user@example.com",
            password="user123"
        )
        
        # Create organizations
        org1 = Organization.objects.create(
            company_name="Company 1",
            owner=user,
            subdomain="company-1",
            status='pending'
        )
        
        org2 = Organization.objects.create(
            company_name="Company 2",
            owner=superuser,
            subdomain="company-2",
            status='pending'
        )
        
        OrganizationUser.objects.create(
            organization=org1,
            user=user,
            role='owner'
        )
        response = self.client.post('/api/token/pair', data={'username': 'admin@example.com', 'password': 'admin123'})
        print(response.content)
        payload = json.loads(response.content)
        access_token = payload['access']
        self.client.headers['Authorization'] = f'Bearer {access_token}'
        
        # Test regular user can only see their organization
        
        # Test superuser can see all organizations
        self.client.force_login(superuser)
        response = self.client.get('/api/organizations/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(json.loads(response.content)), 2)
        
        
        
        response = self.client.get('/api/organizations/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(json.loads(response.content)), 1)
