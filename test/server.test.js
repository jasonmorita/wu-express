var request = require('supertest');

describe('Running app', function () {
    var server;

    beforeEach(function () {
        server = require('../server');
    });

    afterEach(function () {
        server.close();
    });

    it('responds to /', function testSlash(done) {
        request(server)
        .get('/')
        .expect(200, done);
    });

    it('returns JSON for city details', function testJSON(done) {
        request(server)
        .get('/api/v1/conditions/CA/Campbell')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('returns 404 for /missing/dir', function test404(done) {
        request(server)
        .get('/missing/dir')
        .expect(404, done);
    });

});
