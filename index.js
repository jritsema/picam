var express = require('express');
var process = require('child_process');

var photoPath = __dirname + '/photos';

var app = express();

//api for taking a picture
app.post('/camera', function (req, res) {
  // var ls = process.spawn('raspistill', [ '-o', photoPath + '/photo.jpg', '-w', '1024', '-h', '768', '-n' ]);
  // ls.on('close', function (code) {
  //   res.location('/photo.jpg');
  //   res.end();
  // });
  res.end();
});

app.use(express.static(photoPath));

var server = app.listen(9000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('picam listening at http://%s:%s', host, port);
});

//take a picture every x seconds

