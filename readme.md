picam
======

A server that allows a raspberry pi camera to be controlled with an HTTP API and an admin GUI.  It can also be run as a docker container.

The server takes a picture every X seconds and also allows you to take a picture on demand and configure the options.  You can currently only access one photo at a time.


### API

take a picture = `$ curl -X POST http://picam/photo`

get the picture = `$ curl http://picam/photo.jpg`

get camera options = `$ curl http://picam/camera`

set camera options = `$ curl -X PUT http://picam/camera -H "Content-Type: application/json" -d '{}'`

**note:** you can optionally pass camera options when taking a picture, for example:

``
$ curl -X POST http://picam/photo -d '{}'
``

### GUI

Go to `http://picam/admin` for the admin GUI that allows you to take a picture, view a picture, and change the camera options

### Fresh pi setup

- flash sd card using hypriot's os that comes with docker preinstalled

- attach raspberry pi camera

- boot

- optionally change passwd, and host name from black-pearl and enable wifi in `$ nano /boot/occidentalis.txt`

- enable the camera in `$ sudo nano /boot/config.txt` and add the following lines

```
start_x=1
disable_camera_led=1
gpu_mem=128
```

- reboot the pi

- setup docker hub credentials using `$ docker login`

- start the container

```
docker run -it --rm -p 80:9000 --device /dev/vchiq --name picam jritsema/rpi-picam
```
