#!/bin/bash
#set -x

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

[[ -z "${UI_IMAGE_REPOSITORY}" ]] && { UI_IMAGE_REPOSITORY="quay.io/redhatdemo/demo4-leaderboard-nginx:latest"; }
echo "Building ${UI_IMAGE_REPOSITORY}"
cd ${DIR}/../ui
rm -rf build
yarn install
yarn build
s2i build ./build centos/nginx-112-centos7 ${UI_IMAGE_REPOSITORY}
