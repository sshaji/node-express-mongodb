var expect = require('chai').expect,
    request = require('supertest');
 
var mongoose = require('mongoose'),
    mockgoose = require('mockgoose');

mockgoose(mongoose);

var app = require('../../app');

describe('offersApp', function() {

	var CREATED_USER;
	var CREATED_OFFER;

    beforeEach(function(done) {
        mockgoose.reset();
        var User = require('../../models/user'),
            Offer = require('../../models/offer');
        // Create one dummy user
        var user = new User({
            username: 'john',
            enabled: true,
            firstname: 'John',
            lastname: 'Carini',
            email: 'john@test.com' 
        });
        user.save(function(err, user) {
            if(err) {
                console.log('Error creating user in beforeEach: ' + err);
                throw(err);
            } else {
                CREATED_USER = user;
                // Create one dummy offer
                var offer = new Offer({
                    user: user._id,
                    offerdetails: 'Test Offer One' 
                });
                offer.save(function(err, offer) {
                    if(err) {
                        console.log('Error creating offer in beforeEach: ' + err);
                        throw(err);
                    } else {
                      CREATED_OFFER = offer;
                    }
                });
            }
            done();
        });
    });

    describe('when offers list url is called', function() {
      it('should display one of the created offer', function(done) {
          request(app)
          .get('/offers')
          .end(function assert(err, res) {
              expect(err).to.not.be.ok;
              expect(res).to.have.property('status', 200);
              //expect(res.text).to.contains(CREATED_OFFER.offerdetails);
              //expect(res.text).to.contains(CREATED_USER.firstname + ' ' + CREATED_USER.lastname);
              done();
          });
      });
    });

});