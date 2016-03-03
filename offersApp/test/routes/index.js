var expect = require('chai').expect,
    request = require('superagent');

var boot = require('../../bin/www').boot,
    shutdown = require('../../bin/www').shutdown,
    port = require('../../bin/www').port,
    baseUrl = 'http://localhost:' + port;

describe('offersApp', function() {
    before(function(done) {
        boot();
        done();
    })

    after(function(done) {
        shutdown();
        done();
    })

    describe('when base url is called', function() {
      it('should respond to GET', function(done) {
          request
          .get(baseUrl)
          .end(function assert(err, res) {
              expect(err).to.not.be.ok;
              expect(res).to.have.property('status', 200);
              done();
          });
      });
    });
});