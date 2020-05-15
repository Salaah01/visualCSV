# This script should only be used as an initial step to check that the services
# are all working correctly when mvoing onto a new environment. The script will
# create environment varialbes with default values. Once it is confirmed that
# the services do work correclty ALL of these envionrment variable should be
#reaplaced. All environment variables with end with ".env".

echo "Writing .env files..."

# Main client database
mkdir -p client_db/env/client_db
echo postgres > client_db/env/client_db/.postgres_db.env
echo postgres > client_db/env/client_db/.postgres_password.env
echo postgres > client_db/env/client_db/.postgres_user.env

# Main client test database
mkdir -p client_db/env/client_test_db
echo postgres > client_db/env/client_test_db/.postgres_db.env
echo postgres > client_db/env/client_test_db/.postgres_password.env
echo postgres > client_db/env/client_test_db/.postgres_user.env

# Django dataase
mkdir -p django_db/env
echo postgres > django_db/env/.postgres_db.env
echo postgres > django_db/env/.postgres_password.env
echo postgres > django_db/env/.postgres_user.env

# Django application
mkdir -p web/
echo DB_ENGINE=django.db.backends.postgresql > web/.web.env
echo \nDB_HOST=django_db >> web/.web.env
echo \nDB_USER=postgres >> web/.web.env
echo \nDB_NAME=postgres >> web/.web.env
echo \nDB_PASSWORD=postgres >> web/.web.env
echo \nDB_PORT=5432 >> web/.web.env
echo \nDB_CLIENT_ENGINE=django.db.backends.postgresql >> web/.web.env
echo \nDB_CLIENT_HOST=client_db >> web/.web.env
echo \nDB_CLIENT_USER=postgres >> web/.web.env
echo \nDB_CLIENT_NAME=postgres >> web/.web.env
echo \nDB_CLIENT_PASSWORD=postgres >> web/.web.env
echo \nDB_CLIENT_PORT=5432 >> web/.web.env
echo \nDB_CLIENT_TEST_ENGINE=django.db.backends.postgresql >> web/.web.env
echo \nDB_CLIENT_TEST_HOST=client_test_db >> web/.web.env
echo \nDB_CLIENT_TEST_USER=postgres >> web/.web.env
echo \nDB_CLIENT_TEST_NAME=postgres >> web/.web.env
echo \nDB_CLIENT_TEST_PASSWORD=postgres >> web/.web.env
echo \nDB_CLIENT_TEST_PORT=5432 >> web/.web.env

echo "Done! Remember to update all .env with new values!"