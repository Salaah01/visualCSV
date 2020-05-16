"""Views for the misc pages."""

# IMPORTS
# Third Party Imports
from django.shortcuts import render

# Local Imports


def index(request):
    """View for the homepage."""
    return render(request, 'pages/index.html')
