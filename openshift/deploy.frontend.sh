#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

[[ -z "${UI_IMAGE_REPOSITORY}" ]] && { UI_IMAGE_REPOSITORY="quay.io/redhatdemo/demo4-leaderboard-nginx:latest"; }

oc project web-game-demo
echo "Deploying ${UI_IMAGE_REPOSITORY}"

oc process -f ${DIR}/demo4-leaderboard-ui.yml \
  -p IMAGE_REPOSITORY=${UI_IMAGE_REPOSITORY} \
  | oc create -f -
