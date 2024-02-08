#!/bin/bash
git pull origin master

# build ui
docker build -o "./dist" -f Dockerfile.ui .