"""
Django settings for visualCSV project.

Generated by 'django-admin startproject' using Django 3.0.5.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

# IMPORTS
# Python Core Imports
import sys
import os

# Third Party Imports
from django.contrib.messages import constants as messages

# Local Imports

try:
    # A .local_settings file can used in development for ease, in production
    # environment variables should be used.
    from .local_settings import *
except ImportError:
    pass


# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
ALLOWED_HOSTS = ['*', 'ip172-18-0-70-bqs5f5dim9m000flk430-8000.direct.labs.play-with-docker.com']

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY')

# Application definition
INSTALLED_APPS = [
    'data_loader',
    'graph_builder',
    'pages',
    'accounts',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'visualCSV.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'visualCSV.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': os.getenv('DB_ENGINE'),
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'PORT': os.getenv('DB_PORT'),
        'HOST': os.getenv('DB_HOST')
    },
    'client': {
        'ENGINE': os.getenv('DB_CLIENT_ENGINE'),
        'NAME': os.getenv('DB_CLIENT_NAME'),
        'USER': os.getenv('DB_CLIENT_USER'),
        'PASSWORD': os.getenv('DB_CLIENT_PASSWORD'),
        'PORT': os.getenv('DB_CLIENT_PORT'),
        'HOST': os.getenv('DB_CLIENT_HOST')

    },
    'client_test': {
        'ENGINE': os.getenv('DB_CLIENT_TEST_ENGINE'),
        'NAME': os.getenv('DB_CLIENT_TEST_NAME'),
        'USER': os.getenv('DB_CLIENT_TEST_USER'),
        'PASSWORD': os.getenv('DB_CLIENT_TEST_PASSWORD'),
        'PORT': os.getenv('DB_CLIENT_TEST_PORT'),
        'HOST': os.getenv('DB_CLIENT_TEST_HOST')
    }
}

# Much faster to run the tests using an sqlite3 db.
if 'test' in sys.argv:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': 'test_db',
        }
    }

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-gb'

TIME_ZONE = 'GMT'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'visualCSV/static')
]

DATA_UPLOAD_MAX_MEMORY_SIZE = 10000000
FILE_UPLOAD_MAX_MEMORY_SIZE = 10000000