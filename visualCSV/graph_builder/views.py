# IMPORTS
# Python Library Imports


# Third Party Imports
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages, auth
from django.views import View
import psycopg2

# Local Imports
import core_functions


class GraphBuilder(View):

    def get(self, request):
        return HttpResponse('<h1>Graph Builder Page</h1>')
