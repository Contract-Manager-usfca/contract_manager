#!/bin/bash
set -e

# Start SSH tunnel
ssh -v -N -f -o ExitOnForwardFailure=yes -L 3307:sql.cs.usfca.edu:3306 mchanson3@stargate.cs.usfca.edu

# Start Django app
python manage.py runserver 0.0.0.0:8000
