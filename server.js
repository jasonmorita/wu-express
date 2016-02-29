var express = require('express');
var helmet = require('helmet');
var hbs = require('hbs');
var _ = require('lodash');
var engine = require('hbs').__express;
var getDefaults = require('./middleware/getDefaults');
var config = require('./config.js');
var paramLogger = require('./middleware/paramLogger');
var jsonOut = require('./middleware/jsonOut');

var app = express();
var router = express.Router();

// set up handlebars to be view engine
app.engine('hbs', engine);
app.set('view engine', 'hbs');
app.set('views', './views');
hbs.registerPartials(__dirname + '/views/partials');

// set some default security
app.use(helmet());

// root route
app.route('/').get(getDefaults, function(req, res) {
    var results = _.uniq(res.results);
	res.render('index', {
		title: "Choose Weather Report",
		results: results
	});
});

//weather api get state/city route: state and city required
router.route('/conditions/:state/:city').get(paramLogger, jsonOut);

app.use('/api/v1', router);

app.use(function(req, res) {
    res.status(404).render('404', {
		title: "404!",
		url: req.originalUrl
	});
});

var server = app.listen(3000, function() {
	console.log('Get your weather on port ' + server.address().port);
});
