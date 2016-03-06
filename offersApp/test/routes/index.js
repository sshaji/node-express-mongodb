var expect = require('chai').expect,
    request = require('supertest');

var app = require('../../app');

describe('offersApp', function() {
    describe('when base url is called', function() {
      it('should respond to GET', function(done) {
          request(app)
          .get('/')
          .end(function assert(err, res) {
              expect(err).to.not.be.ok;
              expect(res).to.have.property('status', 200);
              done();
          });
      });
    });
});