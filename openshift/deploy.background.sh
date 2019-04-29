#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

[[ -z "${BACKGROUND_IMAGE_REPOSITORY}" ]] && { BACKGROUND_IMAGE_REPOSITORY="quay.io/redhatdemo/demo4-leaderboard-background:latest"; }

oc project web-game-demo
echo "Deploying ${BACKGROUND_IMAGE_REPOSITORY}"

oc process -f ${DIR}/demo4-leaderboard-background.yml \
  -p IMAGE_REPOSITORY=${BACKGROUND_IMAGE_REPOSITORY} \
  | oc create -f -
