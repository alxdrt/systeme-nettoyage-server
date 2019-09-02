# Installation Rabbit-mq HA

export TOKEN=$(kubectl describe secret $(kubectl get secret | awk '/^dashboard-token-/{print $1}') | awk '$1=="token:"{print $2}') && echo -e "\n--- Copy and paste this token for dashboard access --\n$TOKEN\n---"

helm install stable/rabbitmq-ha --name rabbitmq-ha --namespace rabbitmq-ha -f rabbit-values.yaml
watch kubectl get deployments,pods,services --namespace rabbitmq-ha

kubectl patch service my-rabbit-rabbitmq-ha --namespace=rabbit --type='json' --patch='[{"op": "replace", "path": "/spec/ports/0/nodePort", "value":31000}]'
