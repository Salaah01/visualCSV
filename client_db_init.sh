#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$(cat /run/secrets/client_db_user)" --dbname "$(cat /run/secrets/client_db_user)" << EOSQL
\c postgres
CREATE TABLE user_auth (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    table_name VARCHAR(100) NOT NULL,
    table_alias VARCHAR(100) NOT NULL
);

EOSQL