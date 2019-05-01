# Container Overview

Running a container using an imagine from the Docker Hub

```bash
docker run -d -p 3000:3000 --restart=always reselbob/pinger:v2.1
```

Test to make sure it works

```bash
curl localhost:3000
```