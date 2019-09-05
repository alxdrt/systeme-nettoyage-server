# https://github.com/alxdrt/systeme-nettoyage-server.git
cd ../../
docker build serv3-nettoyage/ -t systeme_nettoyage:1.1
docker images
docker run -p 3000:3000 systeme_nettoyage:1.1 &

