var async = require('async');
var request = require('request');
var config = require('../config.js');

module.exports = function(req, res, next) {

    // hardcoded cities to be used in example
    var defaultLocations = [
    	{state: 'CA', city: 'Campbell'},
    	{state: 'MD', city: 'Timonium'},
    	// {state: 'NE', city: 'Omaha'},
    	// {state: 'TX', city: 'Austin'}
    ];

    var urls = defaultLocations.map(function(location) {
        return 'http://api.wunderground.com/api/' + config.apiKey + '/conditions/q/' + location.state + '/' + location.city + '.json';
    });

    var results = [];

    // iterator to be called on each element in url array
    function getData(url, callback) {
        // make the call
        request(url, function(err, res, body) {
                results.push(JSON.parse(body));
                callback(err, body);
            }
        );
    }

    // map over urls to get location info
    async.map(urls, getData, function (err, response){
        if (err) {
            return console.log(err);
        }

        // this will get passed on to be used in view
        req.results = results;
        next();
    });
}
