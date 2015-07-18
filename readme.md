picam
======

An API for controlling a raspberry pi camera.  The server take a picture every X seconds and also allows you to take a picture on demand and configure the options.  You can only access one photo at a time.


### API

take a picture = `curl -X POST http://raspberrypi:9000/camera` 

get the picture = `curl http://raspberrypi:9000/photo.jpg`

configure photo options (raspistill) = `curl -X POST http://raspberrypi:9000/camera/options`


**next:** build a UI in family-dashboard admin for taking pictures on demand and configuring options
