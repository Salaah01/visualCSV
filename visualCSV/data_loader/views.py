# Python Library Imports
import json
import re

# Third Party Imports
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages, auth
from django.views import View
from psycopg2 import sql as psql

# Local Imports
import core_functions


class DataLoader(View):
    """View for the DataLoader pages."""

    @staticmethod
    def _user_tables(userID):
        """Returns a list of tables belonging to the user."""
        if userID == -1:
            return
        else:
            conn = core_functions.connect()
            cur = conn.cursor()
            sql = """SELECT table_name, table_alias
            FROM user_auth
            WHERE user_id = %(user_id)s
            """
            cur.execute(sql, {'user_id': userID})
            data = cur.fetchall()
            core_functions.close(conn)

            return json.dumps(data)

    def get(self, request):
        """Get request"""
        if request.user.is_authenticated:
            userTables = self._user_tables(request.user.id)
            context = {
                'userTables': userTables if userTables else None,
                'userID': request.user.id
            }

            return render(request, 'data_loader/data_loader.html', context)

        else:
            return HttpResponse('<h1>Redirect to sign up screen</h1>')

    def post(self, request):
        #TODO: build a path if there is a error with the import.
        """Post request: validate the import, create database table(s) and
        store the input data before redirecting the user to the graph page.
        The following structure is expected to exist for each file:
        {
            file_id1: {
                table_data: [{
                    col1: {
                        field_type: string,
                        contents: [1, 2, 4, 5, 6 7]
                    }
                ]},
                primary_key: primary_key_field_name,
                foreign_keys: [{
                    field1: table_name,
                    field2: table_name
                }]
            }
        }
        """
        # TODO: Handle the data validation.
        filesData = json.loads(request.POST['post-data'])

        def sanitize_str(string):
            """Sanitizes strings to prevent SQL injections."""
            return re.sub(r'[ \-\;]', '_', string)

        # Set up database connection.
        conn = core_functions.connect()
        cur = conn.cursor()

        for fileName in filesData:
            colsImportData = []
            primaryKey = filesData[fileName]['primary_key']
            foreignKeys = filesData[fileName]['foreign_keys']
            print(filesData[fileName]['table_data'])
            columnNames = [columnData.keys()
                           for columnData in filesData[fileName]['table_data']]
            columnNames = [sanitize_str(list(col)[0]) for col in columnNames]
            contentsSize = len(
                filesData[fileName]['table_data'][0][columnNames[0]]['contents']
            )

            for column in filesData[fileName]['table_data']:
                for colName, colAttr in column.items():
                    colsImportData.append([colName, colAttr['fieldType']])

            # Store Data (without foreign key information)
            tableName = sanitize_str(fileName).replace('.csv', '')
            tableAlias = re.sub('^user__.*?__', '', tableName)

            sqlQuery = f"CREATE TABLE {tableName} (\n"

            for colDetails in colsImportData:
                # column name
                sqlQuery += f'\n{sanitize_str(colDetails[0])} '

                # column type
                if colDetails[1] == 'string':
                    sqlQuery += 'VARCHAR(255)'
                elif colDetails[1] == 'number':
                    sqlQuery += 'NUMERIC'
                else:
                    sqlQuery += f'{sanitize_str(colDetails[1])}'

                # primary key
                if primaryKey == sanitize_str(colDetails[0]):
                    sqlQuery += ' PRIMARY KEY,\n'
                else:
                    sqlQuery += ',\n'

            # Remove the last comma
            sqlQuery = sqlQuery[:len(sqlQuery)-2]
            sqlQuery += "\n);"

            cur.execute(sqlQuery)
            # conn.commit()

            # Add the foreign keys to the table.
            for colName, refTableName in foreignKeys.items():
                sqlQuery = """SELECT a.attname
                    FROM   pg_index i
                    JOIN   pg_attribute a ON a.attrelid = i.indrelid
                                          AND a.attnum = ANY(i.indkey)
                    WHERE  i.indrelid = %s::regclass
                    AND    i.indisprimary;
                """
                cur.execute(sqlQuery, [tableName])

                # TODO: What happens if no results?
                result = cur.fetchone()[0]
                print('result: ', result)

                sqlQuery = f"""ALTER TABLE {sanitize_str(tableName)}
                    ADD FOREIGN KEY ({sanitize_str(colName)})
                    REFERENCES {sanitize_str(refTableName)} ({result})
                    """

                cur.execute(sqlQuery)

            # Load the data from the CSVs.
            for row in range(contentsSize):
                sqlQuery = f'INSERT INTO {tableName} ('
                sqlQuery += ', '.join(columnNames) + ') VALUES ('
                sqlQuery += '%s, ' * len(columnNames)
                sqlQuery = sqlQuery[:len(sqlQuery) - 2] + ');'

                bindVars = []
                for colIdx, column in enumerate(columnNames):
                    bindVars.append(
                        filesData[fileName]['table_data'][colIdx][column]['contents'][row]
                    )

                cur.execute(sqlQuery, bindVars)

            sqlQuery = """INSERT INTO user_auth
                (user_id, table_name, table_alias)
                VALUES (%(userId)s, %(tableName)s, %(tableAlias)s);
                """
            bindVars = {
                'userId': request.user.id,
                'tableName': tableName,
                'tableAlias': tableAlias
            }
            cur.execute(sqlQuery, bindVars)
            conn.commit()

        core_functions.close(conn)

        return HttpResponse('<h1>Post request<h1>')
