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
COPY ssh_keys/docker_key /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa

COPY ssh_keys/docker_key.pub /root/.ssh/id_rsa.pub
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

