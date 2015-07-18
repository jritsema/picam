var express = require('express');
var process = require('child_process');

var options = {
  photoPath: __dirname + '/photos/',
  fileName: 'photo.jpg',
  photoInterval: 5
};

function takePicture(callback) {

  var raspistill = process.spawn('raspistill', 
    [ '-o', options.photoPath + options.fileName, '-n', '-w', '1024', '-h', '768' ]);
  
  raspistill.on('close', function (code) {
    if (callback) 
      callback(code);
  });

  // //testing
  // console.log('click');  
  // if (callback) 
  //   callback(0);  
  // //testing
}

var app = express();

//api for taking a picture
app.post('/camera', function (req, res) {
  takePicture(function (code) {
    res.location('/photo.jpg');
    res.end();
  });
});

app.use(express.static(options.photoPath));

var server = app.listen(9000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('picam listening at http://%s:%s', host, port);
});

function takePictureAndWait() {
  takePicture(scheduleNextPhoto);
}

function scheduleNextPhoto() {
  setTimeout(takePictureAndWait, options.photoInterval * 1000);  
}

//take a picture every x seconds
scheduleNextPhoto();
