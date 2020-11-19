const server = require("../server.js");
const request = require("supertest");

describe('routes', function () {
    it('GET /vestibulares', function (done) {
        request(server).get('/vestibulares')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, function () {
                done();
            });
    });
});

describe('routes', function () {
    it('GET /questoes', function (done) {
        request(server).get('/questoes')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, function () {
                done();
            });
    });
});

describe('routes', function () {
    it('GET /simulados/criar', function (done) {
        request(server).post('/simulados/criar')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, function () {
                done();
            });
    });
});