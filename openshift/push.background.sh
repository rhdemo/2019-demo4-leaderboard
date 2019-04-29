#!/usr/bin/env bash
#set -x

[[ -z "${BACKGROUND_IMAGE_REPOSITORY}" ]] && { BACKGROUND_IMAGE_REPOSITORY="quay.io/redhatdemo/demo4-leaderboard-background:latest"; }

echo "Pushing ${BACKGROUND_IMAGE_REPOSITORY}"
docker push ${BACKGROUND_IMAGE_REPOSITORY}
