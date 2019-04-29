#!/bin/bash
#set -x

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

[[ -z "${BACKGROUND_IMAGE_REPOSITORY}" ]] && { BACKGROUND_IMAGE_REPOSITORY="quay.io/redhatdemo/demo4-leaderboard-background:latest"; }
[[ -z "${BACKGROUND_GIT_REPOSITORY}" ]] && { BACKGROUND_GIT_REPOSITORY="git@github.com:rhdemo/2019-demo4-leaderboard.git"; }
[[ -z "${BACKGROUND_GIT_BRANCH}" ]] && { BACKGROUND_GIT_BRANCH="master"; }

echo "Building ${BACKGROUND_IMAGE_REPOSITORY} from ${BACKGROUND_GIT_REPOSITORY} on ${BACKGROUND_GIT_BRANCH}"

s2i build ${BACKGROUND_GIT_REPOSITORY} --ref ${BACKGROUND_GIT_BRANCH} --context-dir /background docker.io/centos/nodejs-10-centos7:latest ${BACKGROUND_IMAGE_REPOSITORY}
