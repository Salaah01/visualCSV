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
            return render(request, 'data_loader/data_loader.html')

        else:
            return HttpResponse('<h1>Redirect to sign up screen</h1>')

    def post(self, request):
        print('||fffffffffffffffffffffffffffffffffffffffffffffffff|')
        print(request.POST)
        print('================================================')
        return HttpResponse('<h1>Post request<h1>')
