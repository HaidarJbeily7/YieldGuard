from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from .models import Organization, OrganizationUser
import json

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
        self.assertTrue(User.objects.filter(email="test@example.com").exists())
        
        org_user = OrganizationUser.objects.get(user__email="test@example.com")
        self.assertEqual(org_user.role, 'owner')
        
    def test_register_organization_existing_user(self):
        User.objects.create_user(username="test@example.com", 
                               email="test@example.com",
                               password="testpass123")
        
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
                        {"message": "User already exists"})
                        
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
