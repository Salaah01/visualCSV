#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" << EOSQL

CREATE CREATE TABLE user_auth (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    table_name VARCHAR(100) NOT NULL,
    table_alias VARCHAR(100) NOT NULL
);

EOSQL