module.exports = function paramLogger(req, res, next) {
	console.log('Weather params: ', req.params);
	next();
};
