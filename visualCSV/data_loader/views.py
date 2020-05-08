"""View for the DataLoader pages.

The get request loads a template where users will be able to upload their files
and post them to the backend which should be routed to the `post` method
in the `DataLoader` class.

The data from the post request would then be used to create tables and to
populate those tables before redircting the user to te graph loader page.
"""
# IMPORTS
# Python Library Imports
import json
import re
import traceback

# Third Party Imports
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
from django.views import View
import psycopg2

# Local Imports
import core_functions


class DataLoader(View):
    """View for the DataLoader pages. On GET request, user is directed to a
    template which would give them the ability to upload CSVs. Theses CSVs
    are transmitted via the POST request. The data obtained is used to create
    and populate tables based on the data obtained from the request.
    As a final action, the user is then redirected to the graph loader page.
    """

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
            messages.error(
                request,
                'You need to be logged in to view this page.'
            )
            return redirect('login')

    def post(self, request):
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

        # A final report that will indicate whether each file could be uploaded
        # along with any error messages.
        report = {}

        # TODO: Handle the data validation.
        filesData = json.loads(request.POST['post-data'])

        # Set up database connection.
        conn = core_functions.connect()
        cur = conn.cursor()

        for fileName in filesData:
            try:
                colsImportData = []
                primaryKey = filesData[fileName]['primary_key']
                foreignKeys = filesData[fileName]['foreign_keys']
                columnNames = [columnData.keys()
                               for columnData in filesData[fileName]['table_data']]
                columnNames = [core_functions.sanitize(list(col)[0], '_')
                               for col in columnNames]
                contentsSize = len(
                    filesData[fileName]['table_data'][0][columnNames[0]]['contents']
                )

                for column in filesData[fileName]['table_data']:
                    for colName, colAttr in column.items():
                        colsImportData.append([colName, colAttr['fieldType']])

                # Store Data (without foreign key information)
                tableName = core_functions.sanitize(
                    fileName,
                    '_'
                ).replace('.csv', '')
                tableAlias = re.sub('^user__.*?__', '', tableName)

                sqlQuery = f"CREATE TABLE {tableName} (\n"

                for colDetails in colsImportData:
                    # column name
                    sqlQuery += f'\n{core_functions.sanitize(colDetails[0], "_")} '

                    # column type
                    if colDetails[1] == 'string':
                        sqlQuery += 'VARCHAR(255)'
                    elif colDetails[1] == 'number':
                        sqlQuery += 'NUMERIC'
                    else:
                        sqlQuery += f'{core_functions.sanitize(colDetails[1], "_")}'

                    # primary key
                    if primaryKey == core_functions.sanitize(colDetails[0], '_'):
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

                    sqlQuery = f"""ALTER TABLE {core_functions.sanitize(tableName, '_')}
                        ADD FOREIGN KEY ({core_functions.sanitize(colName), '_'})
                        REFERENCES {core_functions.sanitize(refTableName, '_')} ({result})
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
                report[tableAlias] = 'SUCCESS'

                return redirect('graph_builder')

            except psycopg2.errors.DatatypeMismatch:
                report[tableAlias] = 'Mismatch in foreign key types.'
            except psycopg2.errors.DuplicateTable:
                report[tableAlias] = 'This table already exists.'
            # except:
            #     report[tableAlias] = 'Unknown error.'
            finally:
                print(traceback.format_exc())
                core_functions.close(conn)

        return HttpResponse('<h1>Post request<h1>')
