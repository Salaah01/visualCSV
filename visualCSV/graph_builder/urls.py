# IMPORTS
# Python Core Library

# Third Party Imports
from django.urls import path

# Local Imports
from .views import GraphBuilder, TableMetaDataAPI, ColumnDataAPI


urlpatterns = [
    path('', GraphBuilder.as_view(), name='graph_builder'),
    path('table_meta_data_api', TableMetaDataAPI.as_view(),
         name='table_meta_data_api'),
    path('column_data_api', ColumnDataAPI.as_view(), name='column_data_api')
]
