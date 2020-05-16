"""Routes the URLs concerning the misc pages."""

# IMPORTS
# Python Core Imports

# Third Party Imports
from django.urls import path

# Local Imports
from . import views

urlpatterns = [
    path('', views.index, name='index')
]
