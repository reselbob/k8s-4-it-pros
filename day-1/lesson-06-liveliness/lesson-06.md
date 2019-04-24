# Liveliness Probes

An HTTP liveliness probe is one in which Kubelet will send an HTTP GET request into
the pod. If the returned status code is 200, all is good. Anything else, something is going on.

Here's the manifest:

```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    test: liveness
  name: liveness-http
spec:
  containers:
  - name: liveness
    image: k8s.gcr.io/liveness
    args:
    - /server
    livenessProbe:
      httpGet:
        path: /healthz
        port: 8080
        httpHeaders:
        - name: Custom-Header
          value: Awesome
      initialDelaySeconds: 3
      periodSeconds: 3
```

Describe the pod:

`kubectl describe pod liveness-http`

Wait 10 seconds:

`kubectl describe pod liveness-http`

Now, we should see the pod failing