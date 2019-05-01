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
  name: liveness-exec
spec:
  containers:
  - name: liveness
    image: k8s.gcr.io/busybox
    args:
    - /bin/sh
    - -c
    - touch /tmp/hi.there; sleep 90; rm -rf /tmp/hi.there; sleep 600
    livenessProbe:
      exec:
        command:
        - cat
        - /tmp/hi.there
      initialDelaySeconds: 5
      periodSeconds: 5
```

Take a look at the pod's status. Pay attention to the restarts:

`kubectl get pod | grep liveness-exec`

Wait 90 seconds:

`kubectl describe pod liveness-exec`

Now, we should see the pod failing

Take a look at the restarts, again.

`kubectl get pod | grep liveness-exec`