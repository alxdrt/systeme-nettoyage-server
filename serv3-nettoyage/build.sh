# https://github.com/alxdrt/systeme-nettoyage-server.git
cd ..
docker build serv3-nettoyage/ -t systeme_nettoyage:v1
docker images
# docker run --name="systeme_nettoyage"-p 3000:3000 &

# kubectl run systeme-nettoyage --image=systeme_nettoyage --port=3000 --image-pull-policy=Never
# kubectl get pods
# kubectl delete pod,service systeme-nettoyage-96899454d-p6n26

kubectl run systeme-nettoyage --image=marky7/systeme-nettoyage --port=3000


# kubectl delete pods systeme-nettoyage --grace-period=0

# You need to delete the deployment
# kubectl delete deployment systeme-nettoyage
# kubectl describe pod nomdepod

kubectl get pods

# create a local docker registry
# tool k3d



docker run -p 3000:3000 systeme_nettoyage




kubectl create deployment systeme_nettoyage --image=marky7/systeme-nettoyage:0.1.0
kubectl expose deployment systeme-nettoyage --type=LoadBalancer --port 3000 --target-port 3000
