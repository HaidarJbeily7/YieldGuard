from users.controllers import UserController
from organizations.controllers import OrganizationController
from ninja_jwt.controller import NinjaJWTDefaultController
from ninja_extra import NinjaExtraAPI
from django.conf import settings

api = NinjaExtraAPI(title="Darrbak API", version=settings.VERSION or "1.0.0")


api.register_controllers(
    NinjaJWTDefaultController,
    UserController,
    OrganizationController
)
