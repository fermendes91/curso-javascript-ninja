'use strict';

var sum = require('../src/sum.js');
var expect = require('chai').expect;

describe('# SUM', function() {
    it('Should SUM module to be a function', function() {
        // BDD -> Behavior Driven Development
        
       expect(sum).to.be.a('function'); 
    });

    it('Should SUM return 10 when I pass 1 and 9', function() {
        expect(sum(1, 9)).to.be.equal(10);
    });

    it('Should SUM return 5 when I pass 2 and 3', function() {
        expect(sum(2, 3)).to.be.equal(5);
    });

    it('Should SUM return an error if it receive just one parameter', function() {
        expect(sum(1)).to.be.an('error');
    });

    it('Should SUM return an error if it not receive numbers as parameter', function() {
        expect(sum('a', 'b')).to.be.an('error');
    });

    // TDD Style - Test Driven Development
    it('Assert', function() {
        // assert é um modulo padrão do node
        var assert = require('assert');

        assert.equal(sum(20, 30), '50', 'Message'); // compara com ==
        // assert.strictEqual(sum(20, 30), '50', 'Message'); // compara com ===


    });
});

