@REM This will launch docker in interactive mode
set dir=%~dp0

docker build --pull --rm -f "Dockerfile" -t libtiffwasm:latest "." 
docker rm -f libtiffwasm-dev
docker run -it --entrypoint bash --name libtiffwasm-dev -v %dir%build:/build -v %dir%out:/out libtiffwasm:latest