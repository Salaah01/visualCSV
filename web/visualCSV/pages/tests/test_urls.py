"""Unittests for the pages urls.
Tests will check that the the urls resolve the correct view.
"""


# IMPORTS
# Python Core Library

# Third Party Imports
from django.test import TestCase
from django.urls import reverse, resolve

# Local Imports
from ..views import index


class TestUrls(TestCase):
    """Unittest to check that the urls resolve the correct view."""

    def test_index(self):
        """Test that "index" url resolves views.index."""
        url = reverse('index')
        self.assertEquals(resolve(url).func, index)
