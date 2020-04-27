"""View for the GraphBuilder pages. These include:
    * GraphBuilder: Main view for rendering the GraphBuilder page.
    * TableMetaDataAPI: An API endpoint which provides information on tables
        belonging to the user.
"""

# IMPORTS
# Python Library Imports
import json

# Third Party Imports
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages, auth
from django.views import View
import psycopg2

# Local Imports
import core_functions


class GraphBuilder(View):
    """View for the GraphBuilder page."""

    def get(self, request):
        return render(request, 'graph_builder/graph_builder.html')


class TableMetaDataAPI(View):
    """Returns basic table meta on a table as JSON."""

    @core_functions.require_auth
    def get(self, request):
        """Returns the table meta data."""
        conn = core_functions.connect()
        cur = conn.cursor()

        # Retrieve a list of all the tables which belong to the user.
        sql = """
            SELECT table_name, table_alias
            FROM user_auth
            WHERE user_id = %s;
            """
        cur.execute(sql, [request.user.id])
        userTables = cur.fetchall()

        # Initialise a response object for each table belonging to the user.
        response = {}
        for tableName, tableAlias in userTables:
            response[tableName] = {'tableAlias': tableAlias, 'columns': {}}

        # Get a list of all the columns from all the tables belonging to the
        # user.
        sql = """
            SELECT
                ua.table_name,
                i.column_name,
                i.data_type
            FROM user_auth ua
            INNER JOIN information_schema.columns i
            ON ua.table_name = i.table_name
            WHERE ua.user_id = %s;
            """
        cur.execute(sql, [request.user.id])
        userTableColumns = cur.fetchall()

        # Populate the response object with data from the query.
        for tableName, columnName, dataType in userTableColumns:
            response[tableName]['columns'].update({
                columnName + '__' + tableName: {
                    'columnName': columnName,
                    'dataType': dataType
                },
            })

        core_functions.close(conn)

        return HttpResponse(
            json.dumps(response),
            content_type='application/json',
            charset='utf-8'
        )


class ColumnDataAPI(View):
    """Returns the contents of a table's column."""

    @core_functions.require_auth
    def get(self, request):
        """Returns the contents of a table's column based on the paramaters
        provided in the GET request.
        """
        conn = core_functions.connect()
        cur = conn.cursor()

        table = request.GET.get('table')
        column = request.GET.get('column')

        if not table or not column:
            return HttpResponse(
                json.dumps({
                    'error': 'table and/or column paramater not supplied',
                    'error_type': 'MISSING PARAMETERS'
                }),
                content_type='application/json',
                charset='utf8',
                status=400
            )

        table = core_functions.sanitize(table, '_')
        column = core_functions.sanitize(column, '_')

        # Validate the table and column combination exists.
        if not self.validate_table_column(cur, table, column, request.user.id):
            return HttpResponse(
                json.dumps({
                    'error': 'table and column combination does not exist',
                    'error_type': 'INVALID TABLE COLUMN COMBINATION',
                    'table': table,
                    'column': column,
                }),
                content_type='application/json',
                charset='utf-8',
                status=400
            )

        columnData = self.column_data(cur, table, column)

        core_functions.close(conn)
        columnData = core_functions.convert_to_json_serializable(columnData)

        return HttpResponse(
            json.dumps(columnData),
            content_type='application/json',
            charset='utf-8',
            status=200
        )

    @staticmethod
    def validate_table_column(cursor, table, column, userID):
        """Confirm that a `table` and `column` of that table belongs to the
        user.
        Args:
            cursor: (obj) Cursor object.
            table: (str) Table name.
            column: (str) Column Name.
            userID: (int) User ID.
        """
        sql = """SELECT ua.table_name,
                        i.column_name,
                        i.data_type
                FROM user_auth ua
                INNER JOIN information_schema.columns i
                ON ua.table_name = i.table_name
                WHERE ua.user_id = %(userID)s
                AND ua.table_name = %(table)s
                AND i.column_name = %(column)s;
            """
        bindVars = {
            'userID': userID,
            'table': table,
            'column': column
        }

        cursor.execute(sql, bindVars)
        result = cursor.fetchone()
        return result is not None

    @staticmethod
    def column_data(cursor, table, column):
        """Retrieve the contents of a `column` from a given `table`.
        Args:
            cursor: (obj) Cursor object.
            table: (str) Table name.
            column: (str) Column Name.
        """

        pkSql = """SELECT a.attname
                   FROM pg_index i
                   JOIN pg_attribute a ON a.attrelid = i.indrelid
                   AND a.attnum = ANY(i.indkey)
                   WHERE i.indrelid = %s::regclass
                   AND i.indisprimary;
                """
        cursor.execute(pkSql, (table, ))

        pk = cursor.fetchone()

        if pk:
            sql = f"""SELECT {column} FROM {table} ORDER BY {pk[0]};"""

        else:
            orderBySQL = """SELECT column_name
                            FROM information_schema.columns
                            WHERE table_schema = 'public'
                            AND table_name   = %s;
                        """
            cursor.execute(orderBySQL, (table, ))
            orderByCol = cursor.fetchone()[0]

            sql = f'SELECT {column} FROM {table} ORDER BY {orderByCol};'

        cursor.execute(sql)

        data = cursor.fetchall()
        return [col1[0] for col1 in data]
