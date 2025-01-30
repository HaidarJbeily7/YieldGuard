from users.controllers import UserController
from core.controllers import PublicCoreController
from organizations.controllers import OrganizationController
from ninja_jwt.controller import NinjaJWTDefaultController
from ninja_extra import NinjaExtraAPI
from django.conf import settings
from django_rest_passwordreset.controller import ResetPasswordController
from scalar_django_ninja import ScalarViewer
from reports.controllers import ReportController

api = NinjaExtraAPI(
    version="1.0.0",
    title="Darrbak API",
    description="API Reference for the Darrbak API",
    docs=ScalarViewer(),
    docs_url="/docs",
)

api.register_controllers(
    NinjaJWTDefaultController,
    UserController,
    OrganizationController,
    ResetPasswordController,
    PublicCoreController,
    ReportController,
)
