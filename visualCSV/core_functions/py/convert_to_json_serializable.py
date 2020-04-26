"""Convert an array of data to a JSON serializable format."""

# IMPORTS
# Python Library Imports
import decimal

# Third Party Imports

# Local Imports


def convert_to_json_serializable(dataArray):
    """Converts an array of data to a JSON serializable format.
    Args:
        dataArray: (list|tuple) An array of data to convert.
    """

    newArray = []

    for data in dataArray:
        if isinstance(data, decimal.Decimal):
            newArray.append(float(data))
            continue

        newArray.append(data)

    return newArray
