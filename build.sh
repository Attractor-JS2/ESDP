#!/usr/bin/env sh

ssh -v -tt root@rekinetix.ajs2.esdp.almaty.attractor.school <<SSH
  set -ex
  cd ESDP
  ls -al
  git reset --hard
  git checkout feature-deployment
  git status
  git pull
  ./deploy-backend.sh
  ./deploy-frontend.sh
SSH
