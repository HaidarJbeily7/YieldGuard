# routers/api.py
from ninja import NinjaAPI
from users.views import user_router
from organizations.views import router as organization_router

api = NinjaAPI()

api.add_router("/users/", user_router, tags=["Users API"])
api.add_router("/organizations/", organization_router, tags=["Organizations API"])
