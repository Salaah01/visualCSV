# IMPORTS
# Python Core Library

# Third Party Imports
from django.urls import path

# Local Imports
from .views import DataLoader


urlpatterns = [
    path('', DataLoader.as_view())
]