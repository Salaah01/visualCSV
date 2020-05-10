FROM python:3.9-rc-buster
ENV PYTHONUNBUFFERED 1

# Install packages
#   * node: To run the build scripts.
RUN apt-get update \
    && curl -sL https://deb.nodesource.com/setup_11.x | bash - \
    && apt-get install -y nodejs \
    && mkdir /app

WORKDIR /app/

# Install the python packages seperately as it is less likely they will need
# updating whereas it is likely the npm packages may be updated in the future.

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install && npm audit fix

COPY . .

RUN npm run build:react
RUN npm run build:css

WORKDIR /app/visualCSV/
