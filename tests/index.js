'use strict';

var chai = require('chai'),
    expect = chai.expect,
    path = require('path'),
    sinon = require('sinon');

describe('fp-error-handling module', function() {
    var npmModule, myModule,
        modulePath = path.resolve(path.join(process.cwd(), 'index.js')),
        immediateError = function(callback) {
            callback(new Error('immediate'));
        },
        noError = function(callback){
            callback(null, {});
        };

    beforeEach(function(done) {
        npmModule = require(modulePath);
        done();
    });

    afterEach(function(done) {
        myModule = undefined;
        done();
    });

    describe('Module export', function() {
        it('exists', function (done) {
            expect(npmModule).to.exist;
            done();
        });

        it('is function', function (done) {
            expect(typeof npmModule).to.equal('function');
            done();
        });
    });

    describe('instance of Module', function() {
        it('errors callback are fired', function (done) {
            var testSpy = sinon.spy();

            immediateError(npmModule(testSpy));
            expect(testSpy.calledOnce).to.be.ok;
            done()

        });

        it('errors are communicated to the callback', function (done) {
            var testSpy = sinon.spy(),
                ErrorObject = new Error('immediate');

            immediateError(npmModule(testSpy));
            expect(testSpy.calledWith(ErrorObject)).to.be.ok;
            done();
        });

        it('error callback contain an error object', function (done) {
            var ErrorObject = new Error('immediate'),
                testExpect = function(err){
                    expect(err).to.deep.equal(ErrorObject);
                    done();
                };

            immediateError(npmModule(testExpect));
        });

        it('fire continue callback if there is no error', function (done) {
            var testExpect = function(result){
                expect(result).to.deep.equal({});
                done();
            };

            noError(npmModule(null, testExpect));
        });
    });
});
