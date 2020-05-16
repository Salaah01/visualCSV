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

The guide will cover installation using [Docker](https://docs.docker.com/) and installing manually without Docker.
It is recommended to use Docker to install and deploy the application as it is a lot faster and easier.

### Installation Using Docker

**Clone the repository**

Clone (or fork) the repository to your working directory `git clone https://github.com/Salaah01/visualCSV.git`.

**Setting up the environment variables**

The docker version of the installation will use 3 containers:

- Main web application
- PostgreSQL database containing the main tables for the Django application.
- PostgreSQL database for containing the user tables.
- PostgreSQL test database for tests relating to the user database.

Docker will expect files from which it will retrieve values to set as environment variables.
The get started, you can run `bash quick_start_env_files.sh`.
**This is for testing that the docker commands do work, in production you must replace these files with your own environment variables and once deployed, remove the files from your file system.**

I recommend run the bash script and then running `find | grep ".*\.env$"`.
This will return a lit the files where the environment variables are stored.

**Build the services**

```bash
docker-compose build
docker-compose up -d
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

### Production

The following instructions will enable you to deploy the application using [Docker Stack](https://docs.docker.com/engine/reference/commandline/stack/) to deploy a stack to a swarm.
The documentation will describe the steps needed to install the application on an Ubuntu 18.04.3 x64 machine.

**Install Docker**

Ensure that whichever cloud provider you are using does have docker installed. To quickly check if your machine has docker installed, run `docker --version`.
If you need to install docker, you can do so by running the following:

bash
```
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

The application runs 5 services and does not specify any `deploy` rules in `docker-compose.prod.yml`. You may wish to edit this to include replicas and other settings.
Having 5 services does not mean that you must have 5 machines, all of the services can be run from a single machine.

**Initialise Swarm**

On one of your machines, run `docker swarm init  --advertise-addr <ip address>`.
This will initialise the swarm and provide two commands using which you can either add a worker to the swarm or add a manager.
We will add 4 other managers, to do so, run `docker swarm join-token manager` on each of the other machines.

**Update Environment Variables**

```bash
bash quick_start_env_files.sh
```
This will very quickly create .env files which docker will expect when building the stack.
We will test that the stack can be deployed, and once we are happy, we will stop the stack, update the .env files and redeploy the stack.

```bash
docker stack deploy -c output.yml visualCSV
```

Run `docker stack services visualCSV` to check the progress of the swarm. It is ready when all the replicas show the same number on the left and right. e.g: 0/5 means not ready, 5/5 means ready.

This may take a while as the web service needs to run through a number of installations and so you may find that web service and the nginx service (it depends on the web service) take longer than others to initialise.

Once all the services are running, access the public IP address to test that the application is running.

Next stop the stack and update the env file:

```bash
docker stack rm visualCSV
find | grep ".*\.env$"
```

This returns a list of env files that need to be updated. Update the value in each file and re-run `docker stack deploy -c output.yml visualCSV`.
Once everything is running again run `find | grep ".*\.env$" | while read in; do rm "$in"; done` to remove all the .env files.

## Testing

The packages comes with Python and JavaScript unit tests.

To run the Python unit tests run `python visualCSV\manage.py test`.

To test JavaScript unit tests run `npm run test`.
