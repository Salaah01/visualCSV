import json
from django.http import HttpResponse


def require_auth(viewFunc):
    def wrapper(self, request):
        if not request.user.is_authenticated:
            return HttpResponse(
                json.dumps({
                    "error": "user not logged in.",
                    "error_type": "AUTHENTICATION ERROR"
                }),
                status=401,
                content_type='application/json',
                charset='utf-8'
            )
        else:
            return viewFunc(self, request)
    return wrapper
