# Backend Documentation
## Introduction
This documentation provides an overview of our backend system, explaining the processes and components that make up our application when running docker-compose up.

## Prerequisites
Before you begin, ensure you have the following prerequisites:

Docker and Docker Compose installed on your system.
Necessary environment variables and configurations set (e.g., DJANGO_DEBUG, DJANGO_SECRET_KEY, DB_USER, etc.).

## Running the Backend
To start the backend, run the following command:

`docker-compose up`

This command initializes our application by pulling relevant Docker images and starting the required services defined in our `docker-compose.yml` file.

## docker-compose.yml
Our `docker-compose.yml` file is the heart of our backend setup. It defines the services, containers, and configurations required to run the application. Here's an overview:


```
version: '3.8'
services:
  web:
    build: .
    environment:
      DJANGO_DEBUG: ${DJANGO_DEBUG}
      DJANGO_SECRET_KEY: ${DJANGO_SECRET_KEY}
      DB_NAME: user040
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASSWORD}
      DB_HOST: ${DB_HOST}
      DB_PORT: ${DB_PORT}
    command: sh -c "ssh -N -L 3307:sql.cs.usfca.edu:3306 mchanson3@stargate.cs.usfca.edu & python manage.py runserver 0.0.0.0:8000"
    volumes:
      - .:/app
    ports:
      - "8000:8000"
volumes:
  db_data:
``` 

* `web`: This is the name of our backend service.
* `build`: Specifies the build context for the Docker image.
* `environment`: Sets environment variables required by the backend, such as Django settings and database credentials.
* `command`: Defines the command to start the backend, which includes setting up an SSH tunnel and running the Django server.
* `volumes`: Mounts the host directory `.` to `/app` in the container.
* `ports`: Maps the host port 8000 to the container port 8000.

## Entrypoint Script
The `command` section in the `docker-compose.yml` file specifies how the backend is started. The `entrypoint.sh` script is crucial for initializing our backend container. It looks like this:

```
#!/bin/bash
set -e

# Start SSH tunnel
ssh -v -N -f -o ExitOnForwardFailure=yes -L 3307:sql.cs.usfca.edu:3306 mchanson3@stargate.cs.usfca.edu

# Start Django app
python manage.py runserver 0.0.0.0:8000
```

The script sets up an SSH tunnel to `sql.cs.usfca.edu` on port `3306`.
After the SSH tunnel is established, it starts the Django app on `0.0.0.0:8000`.

We use an SSH tunnel because mySQL database is set up on USF's Stargate through SSH.

## Conclusion
This documentation should help you understand the process that occurs when running `docker-compose up` for our backend. Please refer to specific documentation for our backend application for further details on how it operates.