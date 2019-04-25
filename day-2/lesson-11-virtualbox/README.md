# Setting Up Virtual Box

## Virtual Box Downloads

* [Windows](https://download.virtualbox.org/virtualbox/6.0.6/VirtualBox-6.0.6-130049-Win.exe)
* [MAC/OSX](https://download.virtualbox.org/virtualbox/6.0.6/VirtualBox-6.0.6-130049-OSX.dmg) 
* [Linux](https://www.virtualbox.org/wiki/Linux_Downloads)

Cute little tutorial in VirtualBox installation [here](https://www.wikihow.com/Install-VirtualBox).



# Using an Existing Cluster on Google Cloud

You will need to do a lot of set up work on [GC Kubernetes Engine](https://cloud.google.com/kubernetes-engine/). 
However, if you already can setup a cluster in a Google Cloud Project,
then setup time is considerably less.

You'll need a `service-account-access-key.json`, a Google Cloud `PROJECT_ID` and a Google Cloud `GOOGLE_COUNT`. 


```bash
export PROJECT_ID=<project-id-string>
export GOOGLE_ACCOUNT=<google-account-string>
export ACCESS_KEY_PATH=</path/to/service-account-access-key.json>


gcloud config set project $PROJECT_ID
gcloud auth activate-service-account $GOOGLE_ACCOUNT --key-file $ACCESS_KEY_PATH
gcloud container clusters get-credentials pingercluster --zone=us-central1-a
```