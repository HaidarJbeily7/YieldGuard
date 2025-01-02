from ninja import Router, Schema
from django.contrib.auth import login, authenticate, logout
import jwt
from django.conf import settings

user_router = Router()


class LoginSchema(Schema):
    username: str
    password: str


class LoginResponseSchema(Schema):
    success: bool
    message: str
    token: str


@user_router.post("/login", response=LoginResponseSchema)
def user_login(request, payload: LoginSchema):
    user = authenticate(request, username=payload.username, password=payload.password)
    if user is not None:
        login(request, user)
        token = jwt.encode(
            {"username": user.username}, settings.SECRET_KEY, algorithm="HS256"
        )
        return {
            "success": True,
            "message": "Login successful",
            "token": token,
        }
    else:
        return {"success": False, "message": "Invalid credentials"}


@user_router.post("/logout")
def user_logout(request):
    logout(request)
    return {"success": True, "message": "Logout successful"}
