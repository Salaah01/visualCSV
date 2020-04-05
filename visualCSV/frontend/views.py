# Python Library Imports

# Third Party Imports
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages, auth
from django.views import View

# Local Imports


class DataLoaderFE(View):
    def get(self, request):
        return render(request, 'frontend/index.html')