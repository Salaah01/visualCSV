"""Unittests for `core_functions.convert_to_json_serializable`. Tests should
include all types of data conversions handled by the function.
"""

# IMPORTS
# Python Library Imports
import unittest
import decimal

# Third Party Imports

# Local Imports
from core_functions import convert_to_json_serializable


class TestConvertToJsonSeralizable(unittest.TestCase):
    """Unittests for `core_functions.convert_to_json_serializable`."""

    def test_decimal(self):
        """Test that `decimal.Decimal` formats are converted to floats."""
        testArray = [decimal.Decimal(5), decimal.Decimal(10)]
        result = convert_to_json_serializable(testArray)
        expected = [5.0, 10.0]
        self.assertEqual(result, expected)

    def test_ok_values_remain(self):
        """Test that values which do not need to be converted are not removed.
        """
        testArray = ['abc', None]
        result = convert_to_json_serializable(testArray)
        self.assertEqual(testArray, result)
