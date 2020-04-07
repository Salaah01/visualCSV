"""Functions that grant and close to the client database."""

# IMPORTS
# Third Party Imports
import psycopg2

# Local Imports
from visualCSV import local_settings

# TODO: Change this to use ENV_VARS.
DATABASE = local_settings.DATABASES['client']


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
    if conn is not None:
        conn.close()
        print(f"Connection to {DATABASE['HOST']}:{DATABASE['NAME']} closed.")
