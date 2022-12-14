FROM docker.io/emscripten/emsdk:3.1.28

WORKDIR /build
ENTRYPOINT ["bash", "build.sh"]