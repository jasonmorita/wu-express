var express = require('express');
var request = require('request');
var fs = require('fs');
var engines = require('consolidate');
var config = require('./config.js');
var app = express();

app.engine('hbs', engines.handlebars);

app.set('views', './views');
app.set('view engine', 'hbs');

var locations = [
	{state: 'CA', city: 'Campbell'},
	{state: 'MD', city: 'Timonium'},
	{state: 'NE', city: 'Omaha'},
	{state: 'TX', city: 'Austin'}
];

app.get('/', function(req, res) {
	res.render('index', {
		locations: locations
	});
});

app.get('/wu/:state/:city', function(req, res) {
	var url = 'http://api.wunderground.com/api/' + config.apiKey + '/conditions/q/' + req.params.state + '/' + req.params.city + '.json';

	request(url, function(err, response, body) {
		if (!err && response.statusCode === 200) {
			res.send(body);
		}
	});
});

var server = app.listen(3000, function() {
	console.log('Server running on port ' + server.address().port);
});
