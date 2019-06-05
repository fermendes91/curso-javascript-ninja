'use strict';

function sum(a, b) {
    if(isEmpty(a) || isEmpty(b)) {
        return new Error('Passe dois números por parametro');
    }
    
    if(!isNumber(a) || !isNumber(b)) {
        return new Error('Parametros devem ser números');
    }
    return a + b;
}

function isEmpty(arg) {
    return !arg;
}

function isNumber(arg) {
    return Object.prototype.toString.call(arg) === '[object Number]';
}

module.exports = sum;