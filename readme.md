picam
======

A server that allows a raspberry pi camera to be controlled with an HTTP API.

The server takes a picture every X seconds and also allows you to take a picture on demand and configure the options.  You can currently only access one photo at a time.


### API

take a picture = `$ curl -X POST http://raspberrypi:9000/camera` 

get the picture = `$ curl http://raspberrypi:9000/photo.jpg`

configure photo options (raspistill) = `$ curl -X POST http://raspberrypi:9000/camera/options`


**next:** build a UI in family-dashboard admin for viewing the photo, taking pictures on demand and configuring camera options
