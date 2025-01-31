from django.test import TestCase
from django.contrib.auth import get_user_model
from django.utils import timezone
from .models import Report, ReportComment, Organization
from .schemas import ReportCreateInput, ReportUpdateInput, ReportCommentInput

User = get_user_model()

class ReportTests(TestCase):
    def setUp(self):
        self.org = Organization.objects.create(name="Test Org")
        self.user = User.objects.create_user(
            email="test@example.com",
            password="testpass123"
        )
        self.user.organization = self.org
        self.user.save()

        self.report = Report.objects.create(
            reporter=self.user,
            organization=self.org,
            title="Test Report",
            description="Test Description",
            severity="high",
            related_transaction="tx123",
            ip_address="127.0.0.1"
        )

    def test_create_report(self):
        data = ReportCreateInput(
            title="New Report",
            description="New Description",
            severity="medium",
            related_transaction="tx456"
        )
        
        self.client.force_login(self.user)
        response = self.client.post("/api/reports/", data.dict())
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Report.objects.count(), 2)

    def test_list_reports(self):
        self.client.force_login(self.user)
        response = self.client.get("/api/reports/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)

    def test_get_report(self):
        self.client.force_login(self.user)
        response = self.client.get(f"/api/reports/{self.report.id}/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["title"], "Test Report")

    def test_update_report(self):
        data = ReportUpdateInput(
            status="resolved",
            severity="low",
            resolution_notes="Fixed"
        )
        
        self.client.force_login(self.user)
        response = self.client.put(
            f"/api/reports/{self.report.id}/",
            data.dict()
        )
        self.assertEqual(response.status_code, 200)
        
        updated_report = Report.objects.get(id=self.report.id)
        self.assertEqual(updated_report.status, "resolved")
        self.assertIsNotNone(updated_report.resolved_at)

    def test_add_comment(self):
        data = ReportCommentInput(
            comment="Test comment",
            is_internal=False
        )
        
        self.client.force_login(self.user)
        response = self.client.post(
            f"/api/reports/{self.report.id}/comments/",
            data.dict()
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(ReportComment.objects.count(), 1)
