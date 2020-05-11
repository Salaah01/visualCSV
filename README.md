# VisualCSV

VisualCSV is a web application built using [Django](https://www.djangoproject.com/), [React](https://reactjs.org/) and [Redux](https://redux.js.org/) for state management which allows users to upload CSVs and build graphs based on the data in the CSVs.

## How it Works

Once authenticated, users are able to upload CSVs. With the uploaded CSVs users are asked to set any primary and foreign keys. Once the users are happy with their inputs they are able to send their CSVs to the backend by pressing an upload button. This converts a user's choices to JSON and along with the CSV data which is also converted to JSON and send this off to the backend.

The backend then creates database tables based on the POST data and updates the `user_auth` table which contains information on which table belongs to which user.

With this completed, the user is then able to access the graph_builder where they are able to use the UI to build graphs.

Presently, the only way to save the graph is to physically save the a copy of the graph as an image. However, in the future, this will be updated so that this can be saved directly onto the database.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Installation

The guide will cover installation using [Docker Compose](https://docs.docker.com/compose/) and installing manually without Docker.

### Installation Using Docker

**Clone the repository**

Clone (or fork) the repository to your working directory `git clone https://github.com/Salaah01/visualCSV.git`.

**Setting up the environment variables**

The docker version of the installation will use 3 containers:

- Main web application
- PostgreSQL database containing the main tables for the Django application.
- PostgreSQL database for containing the user tables.
- PostgreSQL test database for tests relating to the user database.

Docker-compose will expect a `.env` file for each of the containers. Below are examples of such files with example values:

Main web application: `.web.env`

```bash
SECRET_KEY=jfghfdjgh374y237y7324hjbf732237f
DB_ENGINE=django.db.backends.postgresql
DB_HOST=django_db
DB_USER=postgres
DB_PASSWORD=postgres
DB_PORT=5432
DB_CLIENT_ENGINE=django.db.backends.postgresql
DB_CLIENT_HOST=client_db
DB_CLIENT_USER=postgres
DB_CLIENT_PASSWORD=postgres
DB_CLIENT_PORT=5432
DB_CLIENT_TEST_ENGINE=django.db.backends.postgresql
DB_CLIENT_TEST_HOST=client_test_db
DB_CLIENT_TEST_USER=postgres
DB_CLIENT_TEST_PASSWORD=postgres
DB_CLIENT_TEST_PORT=5432
```

PostgreSQL database containing the main tables for the Django application: `.django_db.env`

```bash
POSTGRES_GB=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgress
```

PostgreSQL database for containing the user tables: `.client_db.env`

```bash
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```

PostgreSQL test database for tests relating to the user database: `client_db_test.env`

```bash
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```

**Build the services**

```bash
docker-compose build
docker-compose up -d
docker-compose run web bash -c "npm install && npm audit fix && python ./visualCSV/manage.py migrate && npm run build"
```

This can take a little while the first time round as it does install the node packages.
The script will bind the visualCSV directory in the host machine to the same directory in the container. Therefore, updating files in the host will update the files in the container.
Once docker-compose has finished it's magic, you are ready to access the site via port 8000 on localhost and start developing!

## Installation Manually

### Prerequisites

You will need to ensure that the following are installed:
* [Python 3](https://www.python.org/downloads/)
* [Node.js](https://nodejs.org/en/download/)
* [PostgreSQL](https://www.postgresql.org/) (The application has not yet been tested on other database systems.)
* [Git](https://git-scm.com/downloads) (Recommended)

### Installing

The system uses two databases. One which is handled by Django's ORM and another that is handled via pure SQL. The Django ORM controlled database we will call visualCSV and the self managed database we will call visualCSVClient.

#### Database setup

Two separate databases are used to separate concerns. The visualCSV database will be used to handle authentication and other tables set up by Django. Whereas visualCSVClient will be used to store the end user's data. As each CSV is assigned its own table, we cannot control how fast the database grows. By designating the end-user tables to its own database, we can better control what is in the visualCSV (the main database).

I recommend using [pgAdmin](https://www.pgadmin.org/) to set up the database as it provides a great GUI for interacting with postgreSQL.
You will need to create three databases, visualCSV, visualCSVClient and visualCSVTest.

If you are using pgAdmin, access the query tool in visualCSVClient and run the following sql:

```sql
CREATE TABLE user_auth (id SERIAL PRIMARY KEY, user_id INTEGER NOT NULL, table_name VARCHAR(100) NOT NULL, table_alias VARCHAR(100) NOT NULL);
```

Repeat the query in the visualCSVClient.

If you choose not to use pgAdmin, you can achieve the same using the command line:

```bash
psql -U postgres
CREATE DATABASE "visualCSV";
CREATE DATABASE "visualCSVClient";
\c visualCSVClient
CREATE TABLE user_auth (id SERIAL PRIMARY KEY, user_id INTEGER NOT NULL, table_name VARCHAR(100) NOT NULL, table_alias VARCHAR(100) NOT NULL);
```

#### Clone the repository

Clone (or fork) the repository to your working directory `git clone https://github.com/Salaah01/visualCSV.git`. If you do not have `git` installed, you can [download the files directly](https://github.com/Salaah01/visualCSV/archive/master.zip).

### Create and activate a virtual environment

To create a virtual environment run `python -m venv venv` . Note: If you are using Linux you may need to run `sudo apt-get install python3-venv`.
Activate the virtual environment.
For Windows users: `venv\scripts\activate`.
For Linux/Mac users: `venv/bin/activate`.

### Install Python packages

Run `pip install -r requirements.txt`

### Install Node packages

Run `npm install`.
You may receive a warning about vulnerabilities in the installed node packages. By running `npm audit fix` you may be able to fix these vulnerabilities (only vulnerabilities which will not break the code).

### Run Node build scripts

Run `npm run build`.
This will compile the React, TypeScript and SASS modules to JavaScript and CSS.

### Django migrations

Run `python visualCSV\manage.py migrate`. This will create the Django tables onto the visualCSV database.

### Start development

Run `python visualCSV\manage.py runserver` to start the development start and run `npm start` to start watching for changes which would require node to recompile certain files.

A script exists which will start the JavaScript unit test on watch mode. This can be run using: `npm run test:watch`.

## Testing

The packages comes with Python and JavaScript unit tests.

To run the Python unit tests run `python visualCSV\manage.py test`.

To test JavaScript unit tests run `npm run test`.
