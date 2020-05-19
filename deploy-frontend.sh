#!/usr/bin/env sh

cd rekinetix-client || exit 13
docker run --rm -it -v $(pwd -P):/app node:10.20.1 bash -c "cd app && yarn && yarn build"
rm -rf /var/www/frontend
mv build/ /var/www/frontend
cd - || exit 13