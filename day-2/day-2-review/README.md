# Day 2 Review In Class Assignment


**Educational Objective:** The educational objective of this exercise is to allow attendees to
have the hands-on experience of creating a pod from from a docker image on DockerHub.

**About the Docker image**

The Docker container image is on GitHub and is named `reselbob/secret-message:v1.0`.

The container images is a web server that emits a response with a secret message. The web server
runs on `port 3001`.
 
 The application is looking for the presence of an environment variable,`DEVELOPER_NAME` 
 
 **WHERE**
 
 `DEVELOPER_NAME` is an environment variable to which a developer can assign his or her name, for 
 example `DEVELOPER_NAME=reselbob`. If no environment  variable is provided, the default value
 that will be used is, `DEVELOPER NAME UNKNOWN`.
  
 **The Assignment**
 
 You are assignment, should you decide to accept it, is to create a Pod on MiniKube with the
 name, `secret-messenger` that uses the image, `reselbob/secret-message:v1.0` to create a container that
 also has the name, `simple-messenger1=`. Also, when you create the pod, inject the
 environment variable, `DEVELOPER_NAME` into the container assigning your developer name to the environment variable.
 
 Then after the pod is created, access container using the command, 
 
 `kubectl exec -it secret-messenger sh`
 
 Then run the command, 
 
 `wget -q -O- http://localhost:30001`
 
 to learn the secret message.
 
 **Helpful hint:**
 
 Day 1, Lesson 4, `simplepod.yaml` found **[here](https://github.com/reselbob/k8s-4-it-pros/blob/master/day-1/lesson-04-pods/simplepod.yaml)**
 can serve as an example as to how to go about completing the assignment.
 
 **BTW:**
 
 You can find the code and `Dockerfile` in the directory, `./app` of the review directory.
 
 This is the source code of the server, 
 
 ```javascript

const http = require('http');
const port = process.env.PORT || 3001;

const handleRequest = function(request, response) {
    const developerName = process.env.DEVELOPER_NAME || 'DEVELOPER NAME UNKNOWN';
    const secretMessage = `Patience is a virtue, ${developerName}`;

    console.log(`Received request for URL: ${request.url} at ${new Date()}`);
    console.log(`Sending secret message, ${secretMessage}`);
    response.writeHead(200);
    response.end(secretMessage);
};

const www = http.createServer(handleRequest);
www.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});

```
 
 
 