var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var twitter = require('twitter');

app.set('views', './views');
app.set('view engine', 'jade');

var twit = new twitter({
	consumer_key: 'S3Sl72xuCuqUPHCCZNliCrFLi',
	consumer_secret: 'tSltKGaQuEbqzvGAyI2xQDEAl6Y1tyoTAl4MuxIEdwvPul2d9K',
	access_token_key: '12402982-9A4SL8Jq1h3c0eDriY99ZnjiENSFB7Sac7y8U4MvC',
	access_token_secret: 'inqv2GZLScGBazH97w0v9DppjFugRs0mduy3zT4xp46aH'
});

twit.stream('statuses/sample', function (stream) {
	console.log('tweet stream initiated');
	
	stream.on('data', function (tweet) {
		if (tweet.coordinates) {
			console.log('received tweet with geo');
			io.emit('tweet', tweet);
		}
	});
});

app.get('/', function(req, res){
	res.render('index');
});

io.on('connection', function(socket){
	console.log('a user connected');
});

var port = Number(process.env.PORT || 5000);

http.listen(port, function(){
  console.log('listening on *:%s', port);
});
