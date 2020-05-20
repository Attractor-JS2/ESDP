#!/usr/bin/env sh

ssh_key=~/.ssh/id_rsa
[[ -f /opt/bitnami/jenkins/jenkins_home/.ssh/id_rsa ]] && ssh_key=/opt/bitnami/jenkins/jenkins_home/.ssh/id_rsa

ssh -v -tt -i ${ssh_key} root@rekinetix.ajs2.esdp.almaty.attractor.school <<SSH
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