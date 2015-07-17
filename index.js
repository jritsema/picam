var express = require('express');
var spawn = require('child_process').spawn;

var app = express();

var photoPath = __dirname + '/photos';

app.post('/camera', function (req, res) {
  var ls = spawn('raspistill', [ '-o', photoPath + '/photo.jpg', '-vf', '-hf', '-w', '1024', '-h', '768', '-n' ]);
  ls.on('close', function (code) {
    res.location('/photo.jpg');
    res.end();
  });
});

app.use(express.static(photoPath));

var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('picam listening at http://%s:%s', host, port);
});