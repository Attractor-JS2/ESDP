#!/usr/bin/env sh


set -e
cd rekinetix-client || exit 13
docker run --rm -v $(pwd -P):/app node:10.20.1 bash -c "cd app && yarn && yarn build"
rm -rf /var/www/frontend
mv build/ /var/www/frontend
git checkout src/axiosBackendInstance.js
cd - || exit 13