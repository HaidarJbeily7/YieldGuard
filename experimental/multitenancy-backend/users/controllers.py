from ninja_jwt.tokens import RefreshToken
from ninja_extra import api_controller, permissions, http_post, http_get
from users.schemas import UserLogout, UserInfo
from ninja_jwt.authentication import JWTAuth
from organizations.models import OrganizationUser

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

@api_controller("/users", permissions=[permissions.AllowAny], tags=["Users API"])
class UserController:
    @http_post(path='/logout', summary="Logout user")
    def logout(self, request, payload: UserLogout):
        try:
            refresh_token = RefreshToken(payload.refresh)
            refresh_token.blacklist()
            return {"success": "Successfully logged out"}
        except Exception as e:
            return {"error": str(e)}


    @http_get(path='/me', summary="Get user info", auth=JWTAuth(), response={200: UserInfo})
    def get_user_info(self, request):
        user = request.user
        organization_user = OrganizationUser.objects.filter(user=user).first()
        return UserInfo(
            id=user.id,
            first_name=user.first_name,
            last_name=user.last_name,
            email=user.email,
            is_superuser=user.is_superuser,
            role=organization_user.role if organization_user else None,
            job_title=organization_user.job_title if organization_user else None,
            organization=organization_user.organization if organization_user else None
        )