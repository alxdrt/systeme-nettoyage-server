cd ..
docker build serv3-nettoyage/ -t systeme_nettoyage
docker images
docker run -p 3000:3000 systeme_nettoyage
