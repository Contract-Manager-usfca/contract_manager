# Use an official Python runtime as the parent image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONUNBUFFERED 1

# Create and set the working directory
WORKDIR /app

# Install MySQL client dev libraries and pkg-config
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    libmariadb-dev \
    pkg-config \
    gcc && \
    apt-get clean && rm -rf /var/lib/apt/lists/*


# Copy the current directory (Django project) into the container at /app
COPY . /app/

# Install any needed packages specified in requirements.txt
RUN pip install --upgrade pip && \
    pip install -r requirements.txt
