#!/usr/bin/bash

# Sets the environment variable files.

MODE="${1,,}"
ROOT_DIR=$(dirname $(realpath ${BASH_SOURCE[0]}))

if [[ ${MODE} != 'prod' ]] && [[ ${MODE} != 'dev' ]]; then
  echo 'Supply "PROD" or "DEV" as the first argument.'
  exit 1
fi

DB_ENV_DIRS=("${ROOT_DIR}/client_db/env/client_db" "${ROOT_DIR}/client_db/env/client_test_db" "${ROOT_DIR}/django_db/env")
WEB_ENV_FILE="${ROOT_DIR}/web/.web.env"

# Check if files can be overwritten.
for dir in ${DB_dir_DIRS[@]}; do
  mkdir -p "${dir}"
  if [[ "$(ls -A ${dir})" ]]; then
    read -p "Files exist in ${dir}, do you want to continue and override [Y/n]: " PROCEED
    if [[ "${PROCEED,}" != 'y' ]]; then
      echo "Exiting..."
      exit 0
    fi
  fi
done

if [[ -f "${WEB_ENV_FILE}" ]]; then
  read -p "${WEB_ENV_FILE} already exists, do you want to continue and override? [Y/n]: " PROCEED

  if [[ "${PROCEED,}" != 'y' ]]; then
    echo "Exiting..."
    exit 0
  fi
fi

# Prepare variables based on whether the user is running in PROD or DEV mode.
if [[ $MODE == 'prod' ]]; then
  echo -e "\033[92mEnvironment Variables Setup for Furlon.\033[0m"
  echo "DB Settings:"
  read -p "Database Name: " POSTGRES_DB_NAME
  read -p "User: " POSTGRES_USER
  read -sp "Password: " POSTGRES_PASSWORD

  echo "Website Settings:"
  read -p "Secret Key: " SECRET_KEY
else
  POSTGRES_DB_NAME=postgres
  POSTGRES_USER=postgres
  POSTGRES_PASSWORD=postgres
  SECRET_KEY=jfghfdjgh374y237y7324hjbf732237f
fi

# Write environment variables.
# Website settings
echo "SECRET_KEY=${SECRET_KEY}" >$WEB_ENV_FILE
echo URL_PREFIX=/projects/furlon/site >>$WEB_ENV_FILE
echo SUB_WEBSITE=1 >>$WEB_ENV_FILE
if [[ $MODE == 'prod' ]]; then
  echo "ALLOWED_HOSTS=web|iamsalaah.com|www.iamsalaah.com" >>$WEB_ENV_FILE
fi

# DB settings
for dir in ${DB_ENV_DIRS[@]}; do
  echo "${POSTGRES_DB_NAME}" >"${dir}/.postgres_db_name.env"
  echo "${POSTGRES_USER}" >"${dir}/.postgres_db_user.env"
  echo "${POSTGRES_PASSWORD}" >"${dir}/.postgres_db_password.env"
done

echo DB_HOST=django_db >>$WEB_ENV_FILE
echo DB_CLIENT_HOST=client_db >>$WEB_ENV_FILE
echo DB_CLIENT_TEST_HOST=client_test_db >>$WEB_ENV_FILE

for db_prefix in DB_ DB_CLIENT_ DB_CLIENT_TEST_; do
  echo "${db_prefix}ENGINE=django.db.backends.postgresql" >>$WEB_ENV_FILE
  echo "${db_prefix}USER=${POSTGRES_USER}" >>$WEB_ENV_FILE
  echo "${db_prefix}NAME=${POSTGRES_DB_NAME}" >>$WEB_ENV_FILE
  echo "${db_prefix}PASSWORD=${POSTGRES_PASSWORD}" >>$WEB_ENV_FILE
  echo "${db_prefix}PORT=5432" >>$WEB_ENV_FILE
done
