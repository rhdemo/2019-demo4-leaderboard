#!/usr/bin/env bash
#set -x

[[ -z "${UI_IMAGE_REPOSITORY}" ]] && { UI_IMAGE_REPOSITORY="quay.io/redhatdemo/demo4-leaderboard-nginx:latest"; }

echo "Pushing ${UI_IMAGE_REPOSITORY}"
docker push ${UI_IMAGE_REPOSITORY}



