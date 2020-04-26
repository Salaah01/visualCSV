"""Unittests for `TableMetaDataAPI`."""

# IMPORTS
# Python Core Library
import json

# Third Party Imports
from django.test import Client
from django.urls import reverse
from django.contrib.auth.models import User
from django.test import TestCase

# Local Imports
from core_functions import ClientDBTestCase


class TestTableMetaDataAPI(ClientDBTestCase, TestCase):
    """Tests that the API returns the corrects for both authenticated and
    unauthenticated users.
    """

    maxDiff = None

    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='t1', password='testuser')

    def tearDown(self):
        self.client.logout()
        self.user.delete()

    def login(self):
        """Logins as the test user."""
        self.client.login(username='t1', password='testuser')

    def test_unauthenticated_status(self):
        """Test for the correct status code for an unauthenticated user."""
        response = self.client.get(reverse('table_meta_data_api'))
        self.assertEqual(response.status_code, 401)

    def test_unauthenticated_response(self):
        """Test that the correct response is returned when the user is
        unauthenticated.
        """
        response = self.client.get(reverse('table_meta_data_api'))
        actual = json.loads(response.content)
        expected = {
            "error": "user not logged in.",
            "error_type": "AUTHENTICATION ERROR"
        }

        self.assertEqual(actual, expected)

    def test_authenticated_status(self):
        """Tests that once a user has logged in, the end point returns a 200
        HTTP status code.
        """
        self.login()
        response = self.client.get(reverse('table_meta_data_api'))

        self.assertEqual(response.status_code, 200)

    def test_authenticated_response(self):
        """Test that the correct information is provided for the authenticated
        user. The response should only include data from table_1 and table_2.
        See the inherited class for details on the tables created.
        """
        self.login()
        response = self.client.get(reverse('table_meta_data_api'))
        actual = json.loads(response.content)
        expected = {
            'table_1': {
                'tableAlias': 'table 1',
                'columns': {
                    'id__table_1': {
                        'columnName': 'id',
                        'dataType': 'numeric'
                    },
                    'name__table_1': {
                        'columnName': 'name',
                        'dataType': 'character varying'
                    },
                    'address__table_1': {
                        'columnName': 'address',
                        'dataType': 'character varying'
                    }
                }
            },
            'table_2': {
                'tableAlias': 'table 2',
                'columns': {
                    'id__table_2': {
                        'columnName': 'id',
                        'dataType': 'numeric'
                    },
                    'name__table_2': {
                        'columnName': 'name',
                        'dataType': 'character varying'
                    },
                    'age__table_2': {
                        'columnName': 'age',
                        'dataType': 'integer'
                    }
                }
            }
        }
        self.assertEqual(actual, expected)
