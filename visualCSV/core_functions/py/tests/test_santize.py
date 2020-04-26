"""Unittests for `core_functions.sanitize`."""

# IMPORTS
# Python Imports
import unittest

# Third Party Imports

# Local Imports
from core_functions import sanitize


class TestSanitize(unittest.TestCase):
    """Unittests for `core_functions.sanitize`."""

    def test_special_characters(self):
        """Test that special characters are replaced with '_'."""
        testString = sanitize('[-;]\`{\}')
        self.assertEqual(testString, '_________')

    def test_space_replacements(self):
        """Test that spaces are replaced correctly."""
        testString = sanitize('  a b c d   ', '_')
        self.assertEqual(testString, '__a_b_c_d___')

    def test_script_tags(self):
        """Test that script tags are escaped."""
        testString = sanitize('<script>Do some bad stuff</script>')
        self.assertEqual(
            testString,
            '&lt;script&gt;Do some bad stuff&lt;/script&gt;'
        )
