# Namespace Introduction

The manifest: 

```yaml
---
kind: Namespace
apiVersion: v1
metadata:
  name: code-district
  labels:
    name: code-district

apiVersion: v1
kind: Pod
metadata:
  namespace: code-district
  name: pinger
  labels:
    app: pinger
spec:
  containers:
  - name: pinger
    image: reselbob/pinger
    ports:
      - containerPort: 3000
    env:
      - name: CURRENT_EXERCISE_VERSION
        value: LESSON_07

```

Create the namespace and put the pod in there:

`kubectl apply -f namespace-intro.yaml`