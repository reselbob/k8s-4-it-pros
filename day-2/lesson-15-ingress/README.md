# Working with Kubernetes Ingress

![Ingress](./images/ingress.png)

## The Ingress Manifest

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: stooges-ingress
spec:
  backend:
    serviceName: stooges
    servicePort: 80
  rules:
    - host: moe.info
      http:
        paths:
        - path: /
          backend:
            serviceName: moe
            servicePort: 3000
    - host: stooges.info
      http:
        paths:
        - path: /moe
          backend:
            serviceName: moe
            servicePort: 3000
        - path: /larry
          backend:
            serviceName: larry
            servicePort: 3000
        - path: /curly
          backend:
            serviceName: curly
            servicePort: 3000
```

## Implementing an Ingress

**Step 1:** Create the Deployments

`kubectl apply -f moe-deployment.yaml`

`kubectl apply -f larry-deployment.yaml`

`kubectl apply -f curly-deployment.yaml`

**Step 2:** Create the Services

`kubectl expose deployment moe --target-port=3000 --type=NodePort`

`kubectl expose deployment larry --target-port=3000 --type=NodePort`

`kubectl expose deployment curly --target-port=3000 --type=NodePort`

**Step 3:** Set Up the Local DNS to `moe.info` and `stooges.info` by making an entry into `/etc/hosts`

Linux and MAC users, do this step do this:

`echo "$(minikube ip) stooges.info moe.info" | sudo tee -a /etc/hosts`

Windows users follow the process described here **[here](https://www.addictivetips.com/windows-tips/modify-the-hosts-file-on-windows-10/)**.


**Step 4:** Turn on the minikube ingress

`minikube addons enable ingress`

**Step 5:** Apply the Ingress

`kubectl apply -f ingress.yaml`

**Step 6:** Take a look

`curl http://moe.info`

`curl http://stooges.info/moe`

`curl http://stooges.info/larry`

`curl http://stooges.info/curly`

## Clean Up

**Step 1:** Clean up

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