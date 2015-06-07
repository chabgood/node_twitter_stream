var express = require('express');
var app = express();
var server = app.listen(3000,function(){
console.log("We have started our server on port 3000");
});
var twitter = require('ntwitter');
io = require('socket.io')(server);

app.get('/', function(req, res){
  console.log('connected');
  res.sendFile(__dirname + '/index.html');
});

var twit = new twitter({
  consumer_key: 'lXlTeCyEU1eNuTI9C0IzF8pn1',
  consumer_secret: 'myJAN6cTKM6CFMeScohIB9Yg8Iw8leaVt9JhRv6pcL6SMlIqhe',
  access_token_key: '889809582-h2e6DbOPHE7kVG49ehXlGl9DmKxSjkpWKj7Gh1yk',
  access_token_secret: '1zoQ2SnQRNhxGOdqcfm29IMEiMb1CYKf9JvzlYvXvPFqo'
});

twit.stream('statuses/filter', {track: ['nodejs','coffeescript','poop']}, function(stream){
  stream.on('data', function(data){
    console.log(data.user.screen_name + ': ' + data.text);
    io.sockets.emit('tweets', {
      user: data.user.screen_name,
      text: data.text
    });
  });
});
server.listen(3000);
