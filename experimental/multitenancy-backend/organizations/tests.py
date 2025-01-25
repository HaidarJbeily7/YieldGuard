from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.models import ContentType
from .models import Organization, OrganizationUser, Vote
import jwt
from django.conf import settings

User = get_user_model()

class OrganizationTests(TestCase):
    def setUp(self):
        # Create test users
        self.user1 = User.objects.create_user(
            username='test1@example.com',
            email='test1@example.com',
            password='testpass123'
        )
        self.user2 = User.objects.create_user(
            username='test2@example.com',
            email='test2@example.com',
            password='testpass123'
        )
        
        # Create test organization
        self.org = Organization.objects.create(
            owner=self.user1,
            subdomain='test-org',
            status='active'
        )
        
        # Create organization memberships
        self.owner_membership = OrganizationUser.objects.create(
            organization=self.org,
            user=self.user1,
            role='owner'
        )
        
        self.member_membership = OrganizationUser.objects.create(
            organization=self.org,
            user=self.user2,
            role='member'
        )
        
        # Setup test client
        self.client = Client()
        
        # Create JWT tokens for authentication
        self.owner_token = jwt.encode(
            {'username': self.user1.username},
            settings.SECRET_KEY,
            algorithm='HS256'
        )
        self.member_token = jwt.encode(
            {'username': self.user2.username},
            settings.SECRET_KEY,
            algorithm='HS256'
        )

    def test_organization_creation(self):
        """Test organization creation"""
        self.assertEqual(self.org.owner, self.user1)
        self.assertEqual(self.org.subdomain, 'test-org')
        self.assertEqual(self.org.status, 'active')

    def test_organization_user_creation(self):
        """Test organization user relationships"""
        self.assertTrue(
            OrganizationUser.objects.filter(
                organization=self.org,
                user=self.user1,
                role='owner'
            ).exists()
        )
        self.assertTrue(
            OrganizationUser.objects.filter(
                organization=self.org,
                user=self.user2,
                role='member'
            ).exists()
        )

    def test_list_organizations_endpoint(self):
        """Test listing organizations endpoint"""
        # Test unauthorized access
        response = self.client.get('/api/organizations/')
        self.assertEqual(response.status_code, 401)
        
        # Test authorized access
        response = self.client.get(
            '/api/organizations/',
            HTTP_AUTHORIZATION=f'Bearer {self.owner_token}'
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)

    def test_get_organization_endpoint(self):
        """Test getting single organization endpoint"""
        # Test unauthorized access
        response = self.client.get(f'/api/organizations/{self.org.id}/')
        # self.assertEqual(response.status_code, 401)
        
        # Test authorized access
        response = self.client.get(
            f'/api/organizations/{self.org.id}/',
            HTTP_AUTHORIZATION=f'Bearer {self.owner_token}'
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['subdomain'], 'test-org')

    def test_add_organization_user_endpoint(self):
        """Test adding users to organization"""
        new_user_data = {
            'email': 'test3@example.com',
            'role': 'member',
            'metadata': {'department': 'Engineering'}
        }
        
        # Test unauthorized access
        response = self.client.post(
            f'/api/organizations/{self.org.id}/users',
            new_user_data,
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 401)
        
        # Test authorized access (as owner)
        response = self.client.post(
            f'/api/organizations/{self.org.id}/users',
            new_user_data,
            content_type='application/json',
            HTTP_AUTHORIZATION=f'Bearer {self.owner_token}'
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()['role'], 'member')

class VoteTests(TestCase):
    def setUp(self):
        # Reuse the setup from OrganizationTests
        self.organization_tests = OrganizationTests()
        self.organization_tests.setUp()
        
        # Create a content type for testing votes
        self.content_type = ContentType.objects.get_for_model(Organization)

    def test_create_vote(self):
        """Test vote creation"""
        vote_data = {
            'vote_type': 'upvote',
            'content_type_id': self.content_type.id,
            'object_id': self.organization_tests.org.id
        }
        
        # Test unauthorized access
        response = self.client.post(
            f'/api/organizations/{self.organization_tests.org.id}/vote',
            vote_data,
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 401)
        
        # Test authorized access
        response = self.client.post(
            f'/api/organizations/{self.organization_tests.org.id}/vote',
            vote_data,
            content_type='application/json',
            HTTP_AUTHORIZATION=f'Bearer {self.organization_tests.owner_token}'
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()['vote_type'], 'upvote')

    def test_list_votes(self):
        """Test listing votes"""
        # Create a test vote first
        Vote.objects.create(
            organization=self.organization_tests.org,
            user=self.organization_tests.user1,
            vote_type='upvote',
            content_type=self.content_type,
            object_id=self.organization_tests.org.id
        )
        
        # Test unauthorized access
        response = self.client.get(
            f'/api/organizations/{self.organization_tests.org.id}/votes'
        )
        self.assertEqual(response.status_code, 401)
        
        # Test authorized access
        response = self.client.get(
            f'/api/organizations/{self.organization_tests.org.id}/votes',
            HTTP_AUTHORIZATION=f'Bearer {self.organization_tests.owner_token}'
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)

    def test_vote_uniqueness(self):
        """Test that users can only have one vote per content object"""
        # Create initial vote
        vote1 = Vote.objects.create(
            organization=self.organization_tests.org,
            user=self.organization_tests.user1,
            vote_type='upvote',
            content_type=self.content_type,
            object_id=self.organization_tests.org.id
        )
        
        # Try to create duplicate vote (should update instead)
        vote_data = {
            'vote_type': 'downvote',
            'content_type_id': self.content_type.id,
            'object_id': self.organization_tests.org.id
        }
        
        response = self.client.post(
            f'/api/organizations/{self.organization_tests.org.id}/vote',
            vote_data,
            content_type='application/json',
            HTTP_AUTHORIZATION=f'Bearer {self.organization_tests.owner_token}'
        )
        
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Vote.objects.count(), 1)
        updated_vote = Vote.objects.get(id=vote1.id)
        self.assertEqual(updated_vote.vote_type, 'downvote')
