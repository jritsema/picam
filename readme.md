picam
======

A server that allows a raspberry pi camera to be controlled with an HTTP API.

The server takes a picture every X seconds and also allows you to take a picture on demand and configure the options.  You can currently only access one photo at a time.


### API

take a picture = `$ curl -X POST http://raspberrypi:9000/photo`

get the picture = `$ curl http://raspberrypi:9000/photo.jpg`

get camera options = `$ curl http://raspberrypi:9000/camera`

set camera options = `$ curl -X PUT http://raspberrypi:9000/camera -H "Content-Type: application/json" -d '{}'`


**note:** you can optionally pass camera options when taking a picture, for example:

``
$ curl -X POST http://raspberrypi:9000/photo -d '{}'
``