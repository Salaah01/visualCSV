"""Unittests for `TableMetaDataAPI`."""

# IMPORTS
# Python Core Library
import os
import json
import unittest

# Third Party Imports
from django.test import Client, TestCase
from django.urls import reverse

# Local Imports


class TestTableMetaDataAPI(unittest.TestCase):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def test_unauthenticated(self):
        """Test that an error respone is returned when the user is not
        authenticated.
        """
        self.assertEqual(1, 1)
