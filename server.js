var express = require('express');
var helmet = require('helmet');
var hbs = require('hbs');
var paramLogger = require('./middleware/paramLogger');
var jsonOut = require('./middleware/jsonOut');

var app = express();
var router = express.Router();

// set some default security
app.use(helmet());

// set up handlebars to be view engine
app.engine('hbs', require('hbs').__express);
app.set('view engine', 'hbs');
app.set('views', './views');
hbs.registerPartials(__dirname + '/views/partials');

// hardcoded cities to be used in example
var defaultLocations = [
	{state: 'CA', city: 'Campbell'},
	{state: 'MD', city: 'Timonium'},
	{state: 'NE', city: 'Omaha'},
	{state: 'TX', city: 'Austin'},
	{state: '', city: 'Nowhere'},
	{state: 'X', city: 'X'}
];

// root route.
app.get('/', function(req, res) {
	res.render('index', {
		title: "Choose Weather Report",
		locations: defaultLocations
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
