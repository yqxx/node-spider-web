var express = require('express');
var path = require('path');
var request = require('request');
var util = require('./util');

var app = express();
var port = process.env.PORT || 3001;

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'static')));

var api_host = 'https://api.liyiqi.me';
var size = 5;

var sources = [];
request(api_host + '/sources', function(error, response, body) {
	sources = JSON.parse(body);
});

app.get('/', function(req, res) {
	var page = 1;
	var offset = (page - 1) * size;
	var url = api_host + '/page?limit=' + size + '&offset=' + offset;

	if(req.query.source){
		url += '&source=' + req.query.source;
	}
	
	request(url, function(error, response, body) {
		var _items = readItem(body);
		res.render('index', {
			title: 'test index',
			sources: sources,
			source: readSource(req.query.source),
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

	var url = api_host + '/page?limit=' + size + '&offset=' + offset;

	if(req.query.source){
		url += '&source=' + req.query.source;
	}

	request(url, function(error, response, body) {
		var _items = readItem(body);
		res.render('index', {
			sources: sources,
			source: readSource(req.query.source),
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
		var body = JSON.parse(body);
		body.content = JSON.parse(body.content);

		res.render('detail', {
			title: 'test detail',
			sources: sources,
			item: body
		});
	});
});

function readItem(body){
	var rows = [];
	var body = JSON.parse(body);

	body.rows.forEach(function(v) {
		var row = {
        	title: v.title,
        	source: readSource(v.source),
        	sid: v.sid,
        	info: v.info,
        	img: v.img,
        	createdAt: util.topicTime(new Date(v.createdAt).getTime())
        }
        rows.push(row);
	});
	body.rows = rows;
    return body;
}

function readSource(code) {
	var source;
	sources.forEach(function(v) {
		if (v.code === code){
			source = v;
			return;
		}
	})
	return source;
}

app.listen(port);
console.log('Express started on port ' + port);