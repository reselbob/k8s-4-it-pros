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
**Step 1:** List the deployment:
 
`kubectl get deployment | grep simpledeployment`

**Step 2:** List the pods:

`kubectl get pods | grep simplepod`

**Step 3:** Describe the deployment:

`kubectl describe deployment simpledeployment`

**Step 4:** Scale the deployment up

`kubectl scale --replicas=5 deployment/simpledeployment`

When a deployment is in force, it will automatically replenish pods that get accidentally nuked. Let's try an 
experiment.

Nuke a pod

**Step 4:** List the pods:

`kubectl get pods | grep simplepod`


**Step 5:** Pick one and delete it

`kubectl delete pod simplepod-A_GUID`

**Step 6:** List the pods again. Notice that Kubernetes is replenishing the pod to the declared number of required replicas:

`kubectl get pods | grep simplepod`

