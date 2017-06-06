var express = require('express');
var path = require('path');
var request = require('request');

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'bower_components')));

app.get('/', function(req, res) {
	request('https://api.liyiqi.me/list', function(error, response, body) {
		res.render('index', {
			title: 'test index',
			items: JSON.parse(body)
		});
	});
});

app.get('/detail/:source/:id', function(req, res) {
	request('https://api.liyiqi.me/detail/' + req.params.source + '/' + req.params.id, function(error, response, body) {
		res.render('index', {
			title: 'test index',
			items: JSON.parse(body)
		});
	});
});

app.listen(3000);
console.log('Express started on port 3000');