#!/usr/bin/env sh

docker-compose up -d --build
docker exec -d esdp_backend node fixtures.js