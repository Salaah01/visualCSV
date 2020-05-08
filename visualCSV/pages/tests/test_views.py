"""Unittests for the pages views.
Tests will check that the views are being rendered.
"""

# IMPORTS
# Python Core Library
from unittest import TestCase

# Third Party Imports
from django.test import Client
from django.urls import reverse

# Local Imports


class TestViews(TestCase):
    """Unittests to ensure that the views are being rendered."""

    def setUp(self):
        self.client = Client()

    def test_index(self):
        response = self.client.get(reverse('index'))
        self.assertEquals(response.status_code, 200)
