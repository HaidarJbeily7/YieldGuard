from django.conf import settings
from .models import Organization


class OrganizationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        request.organization = None
        # Get hostname without port number and convert to lowercase
        hostname = request.get_host().split(':')[0].lower()
        
        # Split hostname into parts
        domain_parts = hostname.split('.')
        # If we have more than 2 parts (subdomain.domain.tld), first part is subdomain
        if len(domain_parts) > 2:
            subdomain = domain_parts[0]
            
            # Check if it's a valid subdomain (not empty or www)
            if subdomain and subdomain != 'www':
                try:
                    # Cache organization lookup
                    request.organization = Organization.objects.select_related().get(
                        subdomain=subdomain,
                        is_active=True
                    )
                except Organization.DoesNotExist:
                    # Log invalid subdomain attempt if needed
                    pass
                
        response = self.get_response(request)
        return response