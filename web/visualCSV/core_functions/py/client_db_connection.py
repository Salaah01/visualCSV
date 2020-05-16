"""Functions allowing to connect and close connection to the client database.
During testing, this will connect to the test database instead.
"""

# IMPORTS
# Python Library
import sys

# Third Party Imports
import psycopg2

# Local Imports
from visualCSV import settings

# TODO: Change this to use ENV_VARS.
if sys.argv[-1] == 'test':
    DATABASE = settings.DATABASES['client_test']
else:
    DATABASE = settings.DATABASES['client']


def connect():
    """Connects to the client database."""
    print("connecting to client database...")
    conn = psycopg2.connect(
        host=DATABASE['HOST'],
        database=DATABASE['NAME'],
        user=DATABASE['USER'],
        password=DATABASE['PASSWORD']
    )
    print(f"Connected to {DATABASE['HOST']}:{DATABASE['NAME']}.")
    return conn


def close(conn):
    """Closes the connection to the client database."""
    if conn:
        conn.close()
        print(f"Connection to {DATABASE['HOST']}:{DATABASE['NAME']} closed.")
