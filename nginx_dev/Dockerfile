FROM nginx:1.19.9-alpine

RUN echo -e "\033[0;31mBuilding PROD Nginx Service\n\033[0m" \
    && rm /etc/nginx/conf.d/default.conf \
    && apk add openssl \
    && openssl req -x509 -nodes -days 365 -subj "/C=CA/ST=QC/O=Company, Inc./CN=mydomain.com" -addext "subjectAltName=DNS:mydomain.com" -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt

COPY ./nginx.conf /etc/nginx/conf.d/

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log
