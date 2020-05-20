#!/usr/bin/env sh

BACKEND_URL=https://api.rekinetix.ajs2.esdp.almaty.attractor.school
set -e
cd rekinetix-client || exit 13
sed -i "s/baseURL:.*$/baseURL: '${BACKEND_URL}'" src/axiosBackendInstance.js
docker run --rm -it  -v $(pwd -P):/app node:10.20.1 bash -c "cd app && yarn && yarn build"
rm -rf /var/www/frontend
mv build/ /var/www/frontend
git checkout src/axiosBackendInstance.js
cd - || exit 13