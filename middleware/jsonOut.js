var request = require('request');
var config = require('../config.js');

module.exports = function jsonOut(req, res, next) {
	// wu api path
	var url = 'http://api.wunderground.com/api/' + config.apiKey + '/conditions/q/' + req.params.state + '/' + req.params.city + '.json';

	request(url, function(err, response, body) {
		// good response
		if (!err && response.statusCode === 200) {
			res.send(body);
		}
	});
};
