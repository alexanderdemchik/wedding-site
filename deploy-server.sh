#!/bin/bash
git pull origin master

# build and start server
docker compose up --build -d -f Dockerfile.server