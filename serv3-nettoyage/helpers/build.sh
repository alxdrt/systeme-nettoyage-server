# https://github.com/alxdrt/systeme-nettoyage-server.git
cd ../../
docker build serv3-nettoyage/ -t systeme_nettoyage:v1
docker images
docker run systeme_nettoyage -p 3000:3000 &

