# Deployments

The declarative way to create a deployment

```bash
kubectl apply -f ./simpledeployment.yaml
```

The manifest:

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: simpledeployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: simpledeployment
  template:
    metadata:
      labels:
        app: simpledeployment
    spec:
      containers:
        - name: simplepod
          image: k8s.gcr.io/hpa-example
          ports:
            - name: app
              containerPort: 80
          env:
            - name: CURRENT_EXERCISE_VERSION
              value: LESSON_5
```
List the deployment:
 
`kubectl get deployment | grep simpledeployment`

List the pods:

`kubectl get pods | grep simplepod`

Describe the deployment:

`kubectl describe deployment simpledeployment`

Scale the deployment up

`kubectl scale --replicas=5 deployment/simpledeployment`