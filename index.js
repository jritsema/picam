var express = require('express');
var app = express();

app.post('/camera', function (req, res) {
  //call:  raspistill -o ./photos/photo.jpg
});

app.use(express.static(__dirname + '/photos'));

var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('picam listening at http://%s:%s', host, port);
});