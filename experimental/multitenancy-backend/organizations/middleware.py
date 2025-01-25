from django.conf import settings
from .models import Organization

class OrganizationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        request.organization = None
        hostname = request.get_host().split(':')[0].lower()
        
        if hostname.endswith(settings.MAIN_DOMAIN):
            subdomain = hostname.replace(f".{settings.MAIN_DOMAIN}", "")
            if subdomain != "www" and subdomain:
                try:
                    request.organization = Organization.objects.get(
                        subdomain=subdomain,
                        is_active=True
                    )
                except Organization.DoesNotExist:
                    pass
                
        response = self.get_response(request)
        return response