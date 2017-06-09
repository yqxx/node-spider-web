var express = require('express');
var path = require('path');
var request = require('request');

var app = express();
var port = process.env.PORT || 3001;

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'static')));

var api_host = 'https://api.liyiqi.me';
var size = 5;

app.get('/', function(req, res) {
	var page = 1;
	var offset = (page - 1) * size;
	request(api_host + '/page?limit=' + size + '&offset=' + offset, function(error, response, body) {
		var _items = JSON.parse(body);
		res.render('index', {
			title: 'test index',
			pageable: {
				page: page,
				size: size,
				number: Math.ceil(_items.count / size)
			},
			items: _items
		});
	});
});

app.get('/page/:page', function(req, res) {
	var page = parseInt(req.params.page);
	var offset = (page - 1) * size;
	request(api_host + '/page?limit=' + size + '&offset=' + offset, function(error, response, body) {
		var _items = JSON.parse(body);
		res.render('index', {
			pageable: {
				page: page,
				size: size,
				number: Math.ceil(_items.count / size)
			},
			items: _items
		});
	});
});



app.get('/detail/:source/:id', function(req, res) {
	request('https://api.liyiqi.me/detail/' + req.params.source + '/' + req.params.id, function(error, response, body) {
		console.log('detail pg.')
		res.render('detail', {
			title: 'test detail',
			item: JSON.parse(body)
		});
	});
});

app.listen(port);
console.log('Express started on port ' + port);