# IMPORTS
# Python Core Library

# Third Party Imports
from django.urls import path

# Local Imports
from .views import GraphBuilder, TableMetaDataAPI


urlpatterns = [
    path('', GraphBuilder.as_view(), name='graph_builder'),
    path('table_meta_data_api', TableMetaDataAPI.as_view(), name='table_meta_data_api')
]