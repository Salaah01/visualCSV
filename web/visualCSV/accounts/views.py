"""Views for the accounts pages."""

# IMPORTS
# Python Core Library
import re

# Third Party Imports
from django.shortcuts import render, redirect

# Local Imports
from django.contrib.auth.models import User
from django.contrib import messages, auth


def login(request):
    """ Views for logging in the user """
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']

        user = auth.authenticate(username=email, password=password)

        if user is not None:
            auth.login(request, user)
            messages.success(request, "You are now logged in")
            return redirect('index')
        else:
            messages.error(
                request, 'Email and/or password did not match our records')
            return redirect('login')
    else:
        return render(request, 'accounts/login.html')


def logout(request):
    ''' Logs the user out '''
    if request.method == 'POST':
        auth.logout(request)
        messages.success(request, 'You are now logged out')
        return redirect('index')


def register(request):
    """Register page."""
    if request.method == 'POST':

        # Get Form Values
        firstName = request.POST['first_name']
        lastName = request.POST['last_name']
        email = request.POST['email']
        password = request.POST['password']
        passwordConfirm = request.POST['password-confirm']

        # Run validation on the password provided. Though this is handled in the front end, the back end handles  it a second time
        # just incase the validation was forced to pass.
        validationPassed, errMsg = validate_register_passwords(
            password, passwordConfirm)

        if not validationPassed:
            messages.error(request, errMsg)
            return redirect('register')

        # Check if the email address is already in use.
        elif User.objects.filter(email=email).exists():
            messages.error(request, 'This email address is already in use')
            return redirect('register')

        else:
            # Register User
            user = User.objects.create_user(
                username=email,
                first_name=firstName,
                last_name=lastName,
                email=email,
                password=password
            )
            user.save()
            messages.success(
                request, 'Congratulations! You are now registered')
            return redirect('login')

    else:
        return render(request, 'accounts/register.html')


def validate_register_passwords(password, confirmedPassword):
    """Given a password and the confirm password input text contents, will
    check if the passwords match and match the complexity criterion.
    """
    # Check if passwords match
    if password != confirmedPassword:
        return [False, 'Passwords do not match.']

    criterion = [
        len(password) >= 6,                         # At least 6 characters
        re.findall('[0-9]', password),              # At least 1 number
        re.findall('[A-z]', password)               # At least 1 letter
    ]

    if all(criterion):
        return [True, None]
    else:
        return [
            False,
            'Must be at least 6 characters. Must have at least 1 number. Must have at least 1 non-number character'
        ]
