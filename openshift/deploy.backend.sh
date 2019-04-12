#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

[[ -z "${SERVER_IMAGE_REPOSITORY}" ]] && { SERVER_IMAGE_REPOSITORY="quay.io/redhatdemo/demo4-leaderboard-server:latest"; }

oc project web-game-demo
echo "Deploying ${SERVER_IMAGE_REPOSITORY}"

oc process -f ${DIR}/demo4-leaderboard-server.yml \
  -p IMAGE_REPOSITORY=${SERVER_IMAGE_REPOSITORY} \
  | oc create -f -
