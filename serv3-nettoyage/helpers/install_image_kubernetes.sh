kubectl delete deployment systeme-nettoyage
kubectl describe pod nomdepod systeme-nettoyage
kubectl create deployment systeme_nettoyage --image=marky7/systeme-nettoyage:0.1.0
kubectl expose deployment systeme-nettoyage --type=LoadBalancer --port 3000 --target-port 3000
kubectl get pods






