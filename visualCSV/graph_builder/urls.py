# IMPORTS
# Python Core Library

# Third Party Imports
from django.urls import path

# Local Imports
from .views import GraphBuilder


urlpatterns = [
    path('', GraphBuilder.as_view(), name='graph_builder')
]