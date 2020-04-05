# IMPORTS
# Python Core Library

# Third Party Imports
from django.urls import path

# Local Imports
from .views import DataLoaderFE


urlpatterns = [
    path('', DataLoaderFE.as_view())
]