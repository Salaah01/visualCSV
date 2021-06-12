"""A custom middleware to address the redirect issues which direct the user
without adding the URL prefixes. This is only used for when the application is
a website within website.
"""

from django.conf import settings
from django.shortcuts import redirect
from django.http import HttpResponseRedirect


class RedirectMiddleware:
    """A custom middleware to address the redirect issues which direct the user
    without adding the URL prefixes. This is only used for when the application
    is a website within website.
    """

    def __init__(self, getResponse):
        self.getResponse = getResponse

    def __call__(self, request):
        response = self.getResponse(request)
        return response

    def process_view(self, request, view, args, kwargs):
        paths = {'accounts/login', 'accounts/register', ''}
        print(request.path)
        print(request.GET)

        path = request.path.rstrip('/')

        if (not request.user.is_authenticated
                and path in {'/data_loader', '/graph_builder'}):
            return redirect(f'{settings.URL_PREFIX}/accounts/login?r=1')

        if request.GET.get('r') != '1' and path not in paths:
            return redirect(f'{settings.URL_PREFIX}{request.path}?r=1')
