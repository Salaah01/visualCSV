"""Sanitizes user imputs."""

# IMPORTS
# Python Library Imports
import re

# Third Party Imports
import bleach

# Local Imports


def sanitize(strInput, spaceReplace=None):
    """Sanitizes the user input.
    Args:
        strInput: (str) The string to sanitize.
        spaceReplace: (str [optional]) A replacement string to replace spaces
            with.
    """

    sanitizedStr = re.sub(r'[\-\;\\\[\]\`\{\}]', '_', strInput)
    sanitizedStr = bleach.clean(sanitizedStr)

    if spaceReplace:
        sanitizedStr = sanitizedStr.replace(' ', spaceReplace)

    return sanitizedStr
