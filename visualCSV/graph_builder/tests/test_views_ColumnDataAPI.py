"""Unittests for `ColumnDataAPI`."""

# IMPORTS
# Python Core Imports
import json

# Third Party Imports
from django.test import Client
from django.urls import reverse
from django.contrib.auth.models import User
from django.test import TestCase
from django.http import QueryDict

# Local Imports
from core_functions import ClientDBTestCase


class TestColumnDataAPI(ClientDBTestCase, TestCase):
    """Tests that the API returns the corrects response for both authenticated
    and unauthenticated users.
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
        response = self.client.get(reverse('column_data_api'))
        self.assertEqual(response.status_code, 401)

    def test_unauthenticated_response(self):
        """Test that the correct response is returned when the user is
        unauthenticated.
        """
        response = self.client.get(reverse('column_data_api'))
        actual = json.loads(response.content)
        expected = {
            "error": "user not logged in.",
            "error_type": "AUTHENTICATION ERROR"
        }

        self.assertEqual(actual, expected)

    def test_no_parameters(self):
        """Tests the response when the user is logged in but has no set any
        query paramaters.
        """
        self.login()
        response = self.client.get(reverse('column_data_api'))
        errorType = json.loads(response.content).get('error_type')

        self.assertEqual(response.status_code, 400)
        self.assertEqual(errorType, 'MISSING PARAMETERS')

    def test_only_table_provided(self):
        """An error should be returned if only the table name is provided."""
        self.login()
        queries = QueryDict('', mutable=True)
        queries.update({'table': 'table_1'})
        url = f'{reverse("column_data_api")}?{queries.urlencode()}'
        response = self.client.get(url)
        errorType = json.loads(response.content).get('error_type')

        self.assertEqual(errorType, 'MISSING PARAMETERS')

    def test_only_column_provided(self):
        """An error should be returned if only the column name is provided."""
        self.login()
        queries = QueryDict('', mutable=True)
        queries.update({'column': 'column_1'})
        url = f'{reverse("column_data_api")}?{queries.urlencode()}'
        response = self.client.get(url)
        errorType = json.loads(response.content).get('error_type')

        self.assertEqual(errorType, 'MISSING PARAMETERS')

    def test_columns_returned(self):
        """Test that the correct columns are returned when the user is logged
        in.
        """
        self.login()
        queries = QueryDict('', mutable=True)
        queries.update({'table': 'table_1', 'column': 'name'})
        url = f'{reverse("column_data_api")}?{queries.urlencode()}'
        response = self.client.get(url)
        result = json.loads(response.content)
        expected = ['name ' + str(i) for i in range(1, 100)]

        self.assertEqual(result, expected)

    def test_bad_request(self):
        """Test that if a non-matching `table` and `column` name is provided,
        then an error is returned.
        """
        self.login()
        queries = QueryDict('', mutable=True)
        queries.update({'table': 'table_1', 'column': 'not a real column'})
        url = f'{reverse("column_data_api")}?{queries.urlencode()}'
        response = self.client.get(url)
        result = json.loads(response.content).get('error_type')
        expected = 'INVALID TABLE COLUMN COMBINATION'

        self.assertEqual(result, expected)
