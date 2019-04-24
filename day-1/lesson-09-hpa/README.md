# Horizontal Pod Autoscaler (HPA)

![HPA](https://d33wubrfki0l68.cloudfront.net/4fe1ef7265a93f5f564bd3fbb0269ebd10b73b4e/1775d/images/docs/horizontal-pod-autoscaler.svg)

Kubernetes Horizontal Pod Autoscaler (HPA) addresses a basic problem in distributed, container based architecture: scaling the
computing environment up or down to meet load demand. When you apply HPA to a Kubernetes deployment or replicaset, intelligence
in HPA will keep an eye on the CPU utilization of the pods in force. When a particular pod starts to approach a usage
threshold, HPA will create additional pods to alleviate the load burden of the pod(s) that is reaching the utilization limit.

The autoscaling capabilities of Kubernetes Horizontal Pod Autoscaler safeguard pods against runtime performance degradation
due to capacity overloads.

## Installing the Metric Server

In order for HPA to work, it needs a controller that reports cluster metrics. Otherwise, it has no way of knowing that 
the condition of the cluster is. In this lesson we'll used Kubernetes Metric Server.

We nee to install it. Metrics Server is **not** part of the general Kubernetes installation. The installing the Metrics Server is a 4 step process.

* Get the metrics server code from GitHub
* Add a setting in the yaml manifest file, `deploy/1.8+/metrics-server-deployment.yaml` to allow the metrics server to
 work in the scenario interactive computing environment
* Apply the manifest files to the Kubernetes cluster running in the scenario to install the metric server
* Verify the metrics server is running

**Step 1:** Get the metrics server code from GitHub:
            
  `cd /`
  
  `git clone https://github.com/kubernetes-incubator/metrics-server.git`
  
After you've cloned the metrics server code from GitHub, to the metrics server directory, like so

**Step 2:** `cd /metrics-server/`

We need to add some information to the manifest yaml file, `deploy/1.8+/metrics-server-deployment.yam` in order to have
Metric Server work properly in this interactive learning environment. We're going to open the yaml file in the terminal
window using the `vi` text editor. Then, we're going to make the necessary addition and finally save the file.
Open the yaml file, `deploy/1.8+/metrics-server-deployment.yaml` in `vi` using the following command:

**Step 3:**  `vi deploy/1.8+/metrics-server-deployment.yaml`


You should see this within the yaml file:

```
  containers:
  - name: metrics-server
    image: k8s.gcr.io/metrics-server-amd64:v0.3.1
    imagePullPolicy: Always
    volumeMounts:
    - name: tmp-dir
      mountPath: /tmp
```

**Step 4:** Put the vi editor in to insert mode and add the text within the comments below:
```
  containers:
  - name: metrics-server
    image: k8s.gcr.io/metrics-server-amd64:v0.3.1
    imagePullPolicy: Always
    #add text starting here...
    command:
    - /metrics-server
    - --metric-resolution=30s
    - --kubelet-insecure-tls
    - --kubelet-preferred-address-types=InternalIP
    #... ending here
    volumeMounts:
    - name: tmp-dir
      mountPath: /tmp
```

**Step 5:** Save the contents of the yaml file.

## Apply the manifest files

Now we need to get the Metrics Server running in Kubernetes

**Step 1 :** Now we need to actually install the metrics server. Execute the command below.

`kubectl apply -f deploy/1.8+/`


## Verify the metrics server is running

**Step 1:** Execute this `kubectl` command to verify the metrics server is installed

`kubectl get po -n kube-system |grep metrics`

**Step 2:** Wait 60 seconds for the metrics server to warm up, then type this command to ensure the the metrics server is working:

`kubectl top pod --all-namespaces`

You should get some metrics info, similar to, but not exactly like this:

```
kube-system   coredns-78fcdf6894-n48vg          2m           10Mi
kube-system   coredns-78fcdf6894-rkbgg          2m           9Mi
kube-system   etcd-master                       14m          85Mi
kube-system   kube-apiserver-master             27m          407Mi
kube-system   kube-controller-manager-master    21m          59Mi
kube-system   kube-proxy-bq9hs                  2m           19Mi
kube-system   kube-proxy-c7qnk                  2m           17Mi
kube-system   kube-scheduler-master             7m           14Mi
kube-system   metrics-server-7dfcc96bd9-txz92   2m           14Mi
kube-system   weave-net-5x6ns                   1m           57Mi
kube-system   weave-net-b9cm6                   1m           52Mi
```


## Installing the sample Web Application with Deployment and Service

In this section will create the application we're going to subject to HPA.

**Step 1:** Clear the screen of your interactive learning environment so that you can view
your work in an uncluttered manner.


`clear`

The objective now is to create the single pod deployment (and service) to which we're going to apply Horizontal
Pod Autoscaling (HPA). Also, we'll bind a Kubernetes service to the deployment.

We'll use the Kubernetes `kubectl run` command to spin up a single pod deployment. The pod will have a web server
application that does nothing more than response `OK!` when a request is made.

**Step 2:** Execute the following command to create the deployment which we'll name, `hpa-demo-web`.

`kubectl run hpa-demo-web --image=k8s.gcr.io/hpa-example --requests=cpu=200m --port=80 --replicas=1`

The command shown above will get the web application container image from Google Cloud.

**Step 3:** Let's make sure the pod is running by executing the following command:

`kubectl get pod | grep hpa-demo-web`


**Step 4:** Start a service that uses the deployment:

`kubectl expose deployment hpa-demo-web --type=NodePort`

**Step 5:**  Check the service is running:

`kubectl get service | grep hpa-demo-web`


## Stressing the Service

In this section we'll create a simple test container that we'll use to access the Kubernetes service, `hpa-demo-web` from
within the cluster. We'll set up continuously a running loop in the test container that keeps calling the
service, `hpa-demo-web`. Continuously calling the service, `hpa-demo-web` will stress out the underlying deployment's
container. Later we'll apply HPA to alleviate the stress. HPA will create more instances of the pod, `hpa-demo-web`.

In order to create the testing container, we'll create a deployment called, `deployment-for-testing` using the `kubectl create`
command. And as part of the imperative execution from the command line, we'll use the option `-it` to login directly
to the pod running under the deployment.

Creating the test container will be done in a new terminal window in the interactive learning environment.

(In this case, the testing deployment will create a pod with a [busybox](https://hub.docker.com/_/busybox) container.)

**Step 1:** Execute following command to create the test container deployment in a new terminal window.

`kubectl run -it deployment-for-testing --image=busybox /bin/sh`

It might take a few seconds, but you should see the command prompt, `/ #`. This prompt indicates
that you are indeed in the Kubernetes cluster. (You might see a message, `If you don't see a command prompt,
try pressing enter.`
If you do, strike the `enter` key.)

Now you are in the cluster. Let's see if we can access the nginx service using the testing service.

**Step 2:** Execute this command to verify that we can indeed access the nginx service:

`wget -q -O- http://hpa-demo-web.default.svc.cluster.local`

If all is going according to plan, you should see the HTML for the nginx Welcome Page, like so:

```
OK!
```

Now that you are in the test container, let's create a little looping program in bash and save it to the file, `loops.sh`.


**Step 3:** Execute the following command to create bash file that will container the looping program.

`echo "while true; do wget -q -O- http://hpa-demo-web.default.svc.cluster.local ; done" > loops.sh`{{execute T2}}

**Step 4:**  We need to give it execute permissions. Execute on the following command:

`chmod +x /loops.sh`{{execute T2}}

**Step 5:** Let's put a burden on the pod, `hpa-demo-web` by running the bash script. 

`sh /loops.sh`

The instructions in the script will keep calling the pod, `hpa-demo-web`. You should see output in the terminal window similar
to the following:
```
OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!
OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!
OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!
OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!
OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!
OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!
``` 

We're at the point now where the pod should be maxing out the CPU of the node in which it's running. In the next step we're
going to take look at the how the pod is faring without HPA. Then we'll apply HPA and see some new pods spin up.

## Applying HPA

In this section we're going to use HPA to alleviate the burden the single pod is creating. We'll apply HPA
to the deployment, `hpa-demo-web`. Then, in the following step we'll take a look at the results.

**Step 1:** Go back to the original terminal pane and look at how many instance of the pod, `hpa-demo-web` are running. Execute the following command to go back to the first terminal window and get a list of the `hpa-demo-web` running in Kubernetes:

`kubectl get pods | grep hpa-demo-web`

You should see output that shows a pod with the prefix `grep hpa-demo-web` on its name, like so:

```
hpa-demo-web-5c4b4789bf-z9pfd             1/1       Running   0          5m
```

**Step 2:** Ask the metrics server for a list of the top running pods using the `kubectl top` command. Execute the following command to get a list of pods according to CPU utilization.

`kubectl top pods --all-namespaces`

You'll probably see output in which the pod `hpa-demo-web` is high on the list, similar to what is shown below:

```
NAMESPACE     NAME                                      CPU(cores)   MEMORY(bytes)
default       deployment-for-testing-5cf785f6d7-vgfd4   10m          2Mi
default       hpa-demo-web-5c4b4789bf-z9pfd             972m         10Mi
kube-system   coredns-78fcdf6894-cnztf                  4m           9Mi
kube-system   coredns-78fcdf6894-q2rn8                  4m           9Mi
kube-system   etcd-master                               14m          73Mi
kube-system   kube-apiserver-master                     33m          402Mi
kube-system   kube-controller-manager-master            22m          60Mi
kube-system   kube-proxy-27dfz                          2m           19Mi
kube-system   kube-proxy-75jl8                          2m           18Mi
kube-system   kube-scheduler-master                     7m           14Mi
kube-system   metrics-server-7dfcc96bd9-fnk2x           1m           15Mi
kube-system   weave-net-7rl6h                           1m           55Mi
kube-system   weave-net-7sqq6                           1m           55Mi
```

Now we need to apply HPA to alleviate the burden.

**Step 3:** Execute the following command to create an HPA against the deployment, `hpa-demo-web`.

`kubectl autoscale deployment hpa-demo-web --cpu-percent=5 --min=1 --max=5`

The HPA will keep an eye on the pods that are backing the `hpa-demo-web` deployment. We set the `--cpu-pecentage` option
on the `kubectrl autoscale` command to a CPU threshold of 5%. Also, we told HPA to have a minimum of 1 pod running
(`--min=1`), but no more than 5 pods (`--max=5`).

Give HPA 60 seconds to get applied to the deployment.

**Step 4:** Take a look at the status of the recently created HPA. Execute the following command to view the status of the HPA.

`kubectl get hpa`

Initially, you're probably going to see output that looks something like this:

```
NAME           REFERENCE                 TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
hpa-demo-web   Deployment/hpa-demo-web   486%/5%   1         5         1          44s
```

Notice that the single pod deploymjent in the output above has a `TARGETS` that are running `486%/5%`. This means that
any pod, in this case the single one, is only permitted to run at `5%`, but that is when all the pods are added it, (in this case
the only single pod) it is running almost `500%` higher. In this case, 5 x 5%, which is 25% of CPU capacity. According to the
HPA configuration, more pods are needed.

Also, you'll notice that in the output above only pod (`REPLICAS 1``) is running. This because it takes HPA a while to notice
that help is needed. HPA polls the metrics server at a default value of 15 seconds in order to figure out if help is needed. When
we take another look at HPA 8 minutes later, we get output that looks similar to this:

**Step 5:** After 60 seconds have passed, take another look.

`kubectl get hpa`

You'll see that HPA is creating more pods to alleviate burden.

```
NAME           REFERENCE                 TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
hpa-demo-web   Deployment/hpa-demo-web   99%/5%    1         5         5          8m

```
## Observing Pod Creation Under HPA


**Step 1:** Get a list of running pods

`kubectl get pod | grep hpa-demo-web`

And get some output the looks similar to this:

```
NAME                                      READY     STATUS    RESTARTS   AGE
deployment-for-testing-5cf785f6d7-sb2cc   1/1       Running   0          5m
hpa-demo-web-5c4b4789bf-5cgrb             1/1       Running   0          3m
hpa-demo-web-5c4b4789bf-bmq2v             1/1       Running   0          6m
hpa-demo-web-5c4b4789bf-lppwr             1/1       Running   0          3m
hpa-demo-web-5c4b4789bf-z7xgg             1/1       Running   0          3m
```

As you can see, even though we started with a deployment that had a only 1 pod, HPA made it so that we as that single
pod exceeded it resource allocation, HPA created more pods to alleviate the burden.