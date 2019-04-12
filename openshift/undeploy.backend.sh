#!/bin/bash
#set -x

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

[[ -z "${SERVER_IMAGE_REPOSITORY}" ]] && { SERVER_IMAGE_REPOSITORY="quay.io/redhatdemo/demo4-leaderboard-nginx:latest"; }

oc project leaderboard-demo
echo "Deploying ${SERVER_IMAGE_REPOSITORY}"

oc process -f ${DIR}/demo4-leaderboard-server.yml | oc delete -f -
