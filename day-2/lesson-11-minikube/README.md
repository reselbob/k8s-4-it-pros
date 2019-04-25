# MiniKube

## Installing `kubectl`

* On Linux [here](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl-on-linux).
* On OSX [here](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl-on-macos).
* On Windows [here](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl-on-windows).

## Installing a `minikube`

Instruction are [here](https://kubernetes.io/docs/tasks/tools/install-minikube/#install-minikube).

## Useful instructions

**Nuke and refresh minikube**

`minikube delete`

`minikube start`

**`ssh` into minikube**

`minikube ssh`

**Get a list of minikube addons**

`minikube addons list`

## Turn on the `minikube` Ingress Control

`minikube addons enable ingress`

## Working ith the `minikube` Dashboard

**Turn on the Dashboard**

`minikube addons enable dashboard`

**Access the Dashboard**

`kubectl proxy --address='0.0.0.0' --disable-filter=true`

If your are trying to access an instance of minikube **running on an external host**, from your browser

`http://[host-ip-adddress]:8001/api/v1/namespaces/kube-system/services/kubernetes-dashboard/proxy`

If your are trying to access an instance of minikube **running on your machine**, from your browser

`http://local:8001/api/v1/namespaces/kube-system/services/kubernetes-dashboard/proxy`
