#Working with Ingress

![Ingress](./images/ingress.png)

## Create the Deployments

`kubectl apply -f moe-deployment.yaml`

`kubectl apply -f larry-deployment.yaml`

`kubectl apply -f curly-deployment.yaml`

## Create the Services
`kubectl expose deployment moe --target-port=3000 --type=NodePort`

`kubectl expose deployment larry --target-port=3000 --type=NodePort`

`kubectl expose deployment curly --target-port=3000 --type=NodePort`

`echo "$(minikube ip) stooges.info" | sudo tee -a /etc/hosts`

#Turn on the minikube ingress

`minikube addons enable ingress`

#Apply the Ingress
`kubectl apply -f ingress.yaml`

## Clean up

`kubectl delete service moe`

------

`kubectl delete deployment moe`

------

`kubectl delete service larry`

------

`kubectl delete deployment larry`

------

`kubectl delete service curly`

------

`kubectl delete deployment curly`

------

`kubectl delete ingress stooges`

------