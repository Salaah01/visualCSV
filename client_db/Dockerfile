FROM postgres:12.2

# `client_db_init` is a script which creates the user_auth table.
COPY client_db_init.sh docker-entrypoint-initdb.d/client_db_init.sh