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

        return HttpResponse(
            json.dumps(response),
            content_type='application/json',
            charset='utf-8'
        )


class TablesColumnDataAPI(View):
    """Returns the contents of a table's column."""

    @core_functions.require_auth
    def get(self, request):
        """Returns the contents of a table's column based on the paramaters
        provided in the GET request.
        """

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
