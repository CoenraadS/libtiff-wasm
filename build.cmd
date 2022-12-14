set dir=%~dp0

docker build --pull --rm -f "Dockerfile" -t libtiffwasm:latest "." 
docker rm -f libtiffwasm
docker run --name libtiffwasm -v %dir%build:/build -v %dir%out:/out libtiffwasm:latest