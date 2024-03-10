#!/bin/bash
git pull origin master

# build ui
docker build -o "./dist" -f Dockerfile.ui .

rm -r /data/www/alexandkhris.com/*

cp -a ./dist /data/www/alexandkhris.com/

service nginx reload