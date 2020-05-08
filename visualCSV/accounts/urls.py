"""Urls for the account views."""

# IMPORTS
# Python Core Imports

# Third Party Imports
from django.urls import path

# Local Imports
from . import views

urlpatterns = [
    path('login', views.login, name='login'),
    path('logout', views.logout, name='logout'),
    path('register', views.register, name='register'),
]
