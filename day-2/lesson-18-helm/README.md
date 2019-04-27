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

**Step 1:** Execute a chart

`helm install --name=chart_01`

**Step 2:** Delete a chart

`helm delete chart_01`

## Chart Operations for a Chart Using Value Variables

The Helm chart's file system

```bash
chart_stooge/
├── Chart.yaml
├── templates
│   ├── deployment.yaml
│   ├── ingress.yaml
│   └── service.yaml
└── values.yaml
```

Contents of the file, `values.yaml`

```yaml
image: reselbob/pingerv2.1
containerPort: 3000
currentVersion: LESSON_18
scale: 2
servicePort: 80
serviceTargetPort: 3000
author: reselbob
```

**Step 1:** Execute a chart

`helm install --name=chart_stooge`

**Step 2:** Delete a chart

`helm delete chart_stooge`
