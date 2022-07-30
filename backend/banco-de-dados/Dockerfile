FROM postgres:13-alpine
ENV POSTGRES_PASSWORD=root
ENV POSTGRES_USER=root
ENV POSTGRES_DB=alumni
COPY createtables.sql /docker-entrypoint-initdb.d/createtables.sql