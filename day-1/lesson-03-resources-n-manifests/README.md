# Kubernetes API Resources
```bash
kubectl api-resources --namespaced=true
kubectl api-resources --namespaced=false
```
# Manifest Example

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: simplepod
  labels:
    app: simplepod
spec:
  containers:
  - name: simplepod
    image: nginx
    ports:
      - name: app
        containerPort: 3000
    env:
      - name: CURRENT_EXERCISE_VERSION
        value: LESSON_03
```

# Applying the manifest

• To create the pod declaratively, type:

`kubectl apply -f simplepod.yaml`

• To see the state of the pod, type:

`kubectl get pod simplepod`

• To learn the details of the pod, type:

`kubectl describe pod simplepod`

• To get to the command line of the only container in the pod, type,

`kubectl exec -it simplepod sh`

• To exit the container, type:

`exit`

• To delete the pod, type:

`kubectl delete pod simplepod`

# Manifest

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: simplepod
  labels:
    app: simplepod
spec:
  containers:
  - name: simplepod
    image: nginx
    ports:
      - name: app
        containerPort: 3000
    env:
      - name: CURRENT_EXERCISE_VERSION
        value: LESSON_03
```



