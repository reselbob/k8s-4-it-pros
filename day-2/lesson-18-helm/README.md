# Working with Helm

## Install Helm

Installation instructions are [here](https://helm.sh/docs/using_helm/#installing-helm).

Run `helm init` which install Tiller.

## The Helm Chart File System

The Helm chart's file system. Helm relies upon the existence file, `Chart.yaml` and
a `templates` directory the contains the files:

* `deployment.yaml`
* `service.yaml`
* `ingress.yaml`



```bash
chart_01
├── Chart.yaml
└── templates
    ├── deployment.yaml
    ├── ingress.yaml
    └── service.yaml

```

## Chart Operations for a Simple Chart

**Step 1:** Execute a release

`helm install chart_01 --name=simplechart`

**Step 2:** List the release

`helm list`

**Step 3:** Try the release out. Find the IP address of minikube

`minikube ip`

Call the URL of the release

`curl http://$(minikube ip)`

**Step 4:** Delete a release

`helm delete simplechart --purge`



## Chart Operations for a Chart Using Value Variables

The Helm chart's file system for Stooges

```bash
chart_stooges/
├── Chart.yaml
├── templates
│   ├── deployment.yaml
│   ├── ingress.yaml
│   └── service.yaml
└── values.yaml
```

Contents of the file, `values.yaml`

```yaml
replicas: 2
lesson: LESSON_18_HELM
author: reselbob
```

**Step 1:** If you do not have your domain name in `/etc/hosts` Linux and MAC users, do this step do this:

`echo "$(minikube ip) stooges.info moe.info" | sudo tee -a /etc/hosts`

Windows users follow the process described here **[here](https://www.addictivetips.com/windows-tips/modify-the-hosts-file-on-windows-10/)**.

**Step 2:** Execute a release 

`helm install chart_stooges --name=stooges`

**Step 3:** Take a look

`curl http://moe.info`

`curl http://stooges.info/moe`

`curl http://stooges.info/larry`

`curl http://stooges.info/curly`

**Step 2:** Delete a release

`helm delete stooges --purge`


**Addendum:** Delete and purge all releases

`helm del $(helm ls --all --short) --purge`
