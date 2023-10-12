# Backend Documentation
## Introduction
This documentation provides an overview of our backend system, explaining the processes and components that make up our application when running docker-compose up.

## Prerequisites
Before you begin, ensure you have the following prerequisites:

Docker and Docker Compose installed on your system.
Necessary environment variables and configurations set (e.g., `DJANGO_DEBUG`, `DJANGO_SECRET_KEY`, `DB_USER`, etc.).

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
    command: sh -c "ssh -N -L 3307:sql.cs.usfca.edu:3306 user@stargate.cs.usfca.edu & python manage.py runserver 0.0.0.0:8000"
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

## Dockerfile

Our Dockerfile is essential for building the Docker image for our backend. It specifies the base image and sets up the environment. Here's an overview:

```
# Use the specified base image
FROM python:3.10

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install SSH client, dnsutils, and other utilities including the default MySQL client
RUN apt-get update && apt-get install -y openssh-client dnsutils default-mysql-client && rm -rf /var/lib/apt/lists/*

# Create and set working directory
WORKDIR /app

# Copy SSH key and set correct permissions
COPY ssh_keys/dock_key /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa

COPY ssh_keys/dock_key.pub /root/.ssh/id_rsa.pub
RUN chmod 600 /root/.ssh/id_rsa.pub

# Add the remote host to the known hosts file
RUN ssh-keyscan stargate.cs.usfca.edu >> /root/.ssh/known_hosts

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy project files to container
COPY . /app/

# Entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT bash /entrypoint.sh
```
* The `FROM` line specifies the base Python image.
* Environment variables and necessary utilities are set up using `ENV`.
* SSH key and known hosts are configured for secure SSH connections. Using `COPY`, SSH keys are copied from the local machine to the Docker container.
* Python dependencies are installed, and project files are copied into the container.
* The `entrypoint.sh` script is configured as the entry point.


## Entrypoint Script
The `command` section in the `docker-compose.yml` file specifies how the backend is started. The `entrypoint.sh` script is crucial for initializing our backend container. It looks like this:

```
#!/bin/bash
set -e

# Start SSH tunnel
ssh -v -N -f -o ExitOnForwardFailure=yes -L 3307:sql.cs.usfca.edu:3306 user@stargate.cs.usfca.edu

# Start Django app
python manage.py runserver 0.0.0.0:8000
```

The script sets up an SSH tunnel to `sql.cs.usfca.edu` on port `3306`.
After the SSH tunnel is established, it starts the Django app on `0.0.0.0:8000`.

We use an SSH tunnel because mySQL database is set up on USF's Stargate through SSH.

## Conclusion
This documentation should help you understand the process that occurs when running `docker-compose up` for our backend. Please refer to specific documentation for our backend application for further details on how it operates.