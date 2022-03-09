FROM mariadb:10

WORKDIR /
COPY entrypoint/* docker-entrypoint-initdb.d/

ENV MARIADB_ROOT_PASSWORD=******

EXPOSE 3306
