#!/bin/bash
#set -x

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

[[ -z "${SERVER_IMAGE_REPOSITORY}" ]] && { SERVER_IMAGE_REPOSITORY="quay.io/redhatdemo/demo4-leaderboard-server:latest"; }
[[ -z "${SERVER_GIT_REPOSITORY}" ]] && { SERVER_GIT_REPOSITORY="git@github.com:rhdemo/2019-demo4-leaderboard.git"; }
[[ -z "${SERVER_GIT_BRANCH}" ]] && { SERVER_GIT_BRANCH="master"; }

echo "Building ${SERVER_IMAGE_REPOSITORY} from ${SERVER_GIT_REPOSITORY} on ${SERVER_GIT_BRANCH}"

s2i build ${SERVER_GIT_REPOSITORY} --ref ${SERVER_GIT_BRANCH} --context-dir /server docker.io/centos/nodejs-10-centos7:latest ${SERVER_IMAGE_REPOSITORY}
