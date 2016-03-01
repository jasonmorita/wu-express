var request = require('request');
var config = require('../config.json');

module.exports = function jsonOut(req, res, next) {
	// wu api path
	var url = 'http://api.wunderground.com/api/' + config.apiKey + '/conditions/q/' + req.params.state + '/' + req.params.city + '.json';

	request(url, function(err, response, body) {
        if (err) {
            return console.log(err);
        }

		// good response
		if (!err && response.statusCode === 200) {
			res.json(JSON.parse(body));
		}
	});
};
