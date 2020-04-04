# Python Library Imports

# Third Party Imports
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages, auth
from django.views import View

# Local Imports


class DataLoader(View):
    def get(self, request):

        if request.user.is_authenticated:
            return HttpResponse('<h1>Logged in </h1>')
        else:
            return HttpResponse('<h1>Not logged in</h1>')