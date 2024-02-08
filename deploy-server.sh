#!/bin/bash
git pull origin master

# build and start server
docker compose --env-file ./server-nest/.env up --build -d