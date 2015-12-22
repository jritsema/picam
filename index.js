var express = require('express');
var process = require('child_process');
var bodyParser = require('body-parser');

var options = {
  photoPath: __dirname + '/photos/',
  fileName: 'photo.jpg',
  photoInterval: 30,
  cliArgs: '-n -w 1024 -h 768'
};

function takePicture(callback) {

  var args1 = [ '-o', options.photoPath + options.fileName ];

  //parse cliArgs into array of strings
  var args2 = options.cliArgs.split(' ');

  var args = args1.concat(args2);
  console.log(args);

  var raspistill = process.spawn('raspistill', args);

  raspistill.on('close', function (code) {
    if (callback)
      callback(code);
  });

  // //testing
  // console.log('click');
  // if (callback)
  //   setTimeout(callback, 5000);
  // //testing
}

var app = express();

//cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json()); // for parsing application/json

//api for taking a picture
app.post('/photo', function (req, res) {
  if (req.body && req.body.cliArgs)
    options.cliArgs = req.body.cliArgs;

  takePicture(function (code) {
    res.location('/photo.jpg');
    res.send(options);
  });
});

//api for reading camera options
app.get('/camera', function (req, res) {
  res.send(options);
});

//api for writing camera options
app.put('/camera', function (req, res) {

  if (req.body.photoPath)
    options.photoPath = req.body.photoPath;

  if (req.body.fileName)
    options.fileName = req.body.fileName;

  if (req.body.photoInterval)
    options.photoInterval = req.body.photoInterval;

  if (req.body.cliArgs)
    options.cliArgs = req.body.cliArgs;

  res.send(options);
});

//http://localhost:9000/photo.jpg
app.use(express.static(options.photoPath));

//http://localhost:9000/admin
app.use('/admin', express.static(__dirname + '/public'));

var server = app.listen(9000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('picam listening at http://%s:%s', host, port);
});

function takePictureAndScheduleNext() {
  takePicture(scheduleNextPhoto);
}

function scheduleNextPhoto() {
  setTimeout(takePictureAndScheduleNext, options.photoInterval * 1000);
}

//take a picture every x seconds
scheduleNextPhoto();
