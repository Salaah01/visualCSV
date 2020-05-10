"""A base class module which will will aid unit tests which involve interacting
with the client database. The module with inherit `unittest.TestCase` and
automate tasks such as populating the database with dummy data and clearing it
down.
"""

# IMPORTS
# Python Library Imports
from unittest import TestCase
from random import random

# Third Party Imports
import psycopg2

# Local Imports
from visualCSV.settings import DATABASES


class ClientDBTestCase(TestCase):
    """Base class module which extends `unittest.TestCase` allowing user to
    automate certain set up and tear down tasks when testing modules which
    interact with the test database.
    """

    # Create the connection and cursor.
    connection = DATABASES['client_test']
    print

    conn = psycopg2.connect(
        host=connection['HOST'],
        database=connection['NAME'],
        user=connection['USER'],
        password=connection['PASSWORD'],
        port=connection['PORT']
    )
    cur = conn.cursor()

    print(f"Connected to {connection['HOST']}:{connection['NAME']}")

    def __init__(self, *args, **kwargs):
        """Creates a connection to the test database as well as populating the
        database (optional).
        Args:
            populateDummyData: (bool) Should the database be populated with
                dummy data.
        """
        super().__init__(*args, **kwargs)

        # Delete tables inacase an easier test run failed and the teardown
        # process did not run properly.
        self.cur.execute("""
            drop table if exists user_auth;
            drop table if exists table_1;
            drop table if exists table_2;
            drop table if exists table_3;
            """)

        # Create the user auth table.
        self.cur.execute("""CREATE TABLE user_auth (
            id INTEGER PRIMARY KEY,
            user_id INTEGER,
            table_name VARCHAR(255),
            table_alias VARCHAR(255)
        )""")

        if kwargs.get('populateDummyData') in (None, True):
            self._populateDummyData()

    def _populateDummyData(self):
        """Populates the database with dummy data."""

        # Populate the user_auth table.
        userAuthData = [
            {'id': 1, 'user_id': 1, 'table_name': 'table_1', 'table_alias': 'table 1'},
            {'id': 2, 'user_id': 1, 'table_name': 'table_2', 'table_alias': 'table 2'},
            {'id': 3, 'user_id': 2, 'table_name': 'table_3', 'table_alias': 'table 3'},
        ]
        for data in userAuthData:
            sql = """INSERT INTO user_auth (id, user_id, table_name, table_alias)
                VALUES(%(id)s, %(userID)s, %(tableName)s, %(tableAlias)s);
                """
            bindVars = {
                'id': data['id'],
                'userID': data['user_id'],
                'tableName': data['table_name'],
                'tableAlias': data['table_alias']
            }
            self.cur.execute(sql, bindVars)

        # Create individual tables and populate with data.
        # TABLE 1
        self.cur.execute("""CREATE TABLE table_1 (
                            id NUMERIC PRIMARY KEY,
                            name VARCHAR(255),
                            address VARCHAR(255)
                        );""")

        tableData = [{'id': i, 'name': 'name ' +
                      str(i), 'address': 'address ' + str(i)} for i in range(1, 100)
                     ]

        for dataRow in tableData:
            sql = """INSERT INTO table_1 (id, name, address)
                VALUES (%(id)s, %(name)s, %(address)s);
                """
            bindVars = {
                'id': dataRow['id'],
                'name': dataRow['name'],
                'address': dataRow['address']
            }

            self.cur.execute(sql, bindVars)

        # TABLE 2
        self.cur.execute("""
            CREATE TABLE table_2 (
                id NUMERIC PRIMARY KEY,
                name VARCHAR(255),
                age INTEGER
            )
            """
                         )

        tableData = [{'id': i, 'name': 'name ' +
                      str(i), 'age': i} for i in range(1, 100)
                     ]

        for dataRow in tableData:
            sql = """INSERT INTO table_2 (id, name, age)
                VALUES (%(id)s, %(name)s, %(age)s);
                """
            bindVars = {
                'id': dataRow['id'],
                'name': dataRow['name'],
                'age': dataRow['age']
            }

            self.cur.execute(sql, bindVars)

        # TABLE 3
        self.cur.execute("""
            CREATE TABLE table_3 (
                id NUMERIC PRIMARY KEY,
                hotel VARCHAR(255),
                expense NUMERIC,
                income NUMERIC
            )
            """
                         )

        tableData = [
            {
                'id': i,
                'hotel': 'hotel ' + str(i),
                'expense': round(random()*1000, 2),
                'income': round(random()*1000, 2)
            } for i in range(1, 100)
        ]

        for dataRow in tableData:
            sql = """INSERT INTO table_3 (id, hotel, expense, income)
                VALUES (%(id)s, %(hotel)s, %(expense)s, %(income)s);
                """
            bindVars = {
                'id': dataRow['id'],
                'hotel': dataRow['hotel'],
                'expense': dataRow['expense'],
                'income': dataRow['income']
            }

            self.cur.execute(sql, bindVars)
            self.conn.commit()

    def close_connection(self):
        """Closes the connection to the database."""
        if self.conn:
            self.conn.close()
            print(f'Connection to the database has ben closed.')
