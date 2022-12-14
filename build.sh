#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

docker build --pull --rm -f "Dockerfile" -t libtiffwasm:latest "." 
docker rm -f libtiffwasm
docker run --name libtiffwasm -v ${DIR}/build:/build -v ${DIR}/out:/out libtiffwasm:latest