CREATE CREATE TABLE user_auth (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    table_name VARCHAR(100) NOT NULL,
    table_alias VARCHAR(100) NOT NULL
);