# Python Library Imports
import json

# Third Party Imports
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages, auth
from django.views import View

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

        print('||fffffffffffffffffffffffffffffffffffffffffffffffff|')
        # print(request.POST)
        print('================================================')
        return HttpResponse('<h1>Post request<h1>')
