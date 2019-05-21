(function() {
    'use strict'

    function DOM(elements) {
        if(!(this instanceof DOM)) // possibilita fazer a criação de objeto sem o uso do New
          return new DOM(elements);

        this.element = document.querySelectorAll(elements);
      }
    
      DOM.prototype.on = function on(eventType, callback) {
        Array.prototype.forEach.call(this.element, function (element) {
          element.addEventListener(eventType, callback, false);
        });
      }
    
      DOM.prototype.off = function off(eventType, callback) {
        Array.prototype.forEach.call(this.element, function (element) {
          element.removeEventListener(eventType, callback, false);
        });
      }
    
      DOM.prototype.get = function get(index) {
        if(!index)
          return this.element[0];
        return this.element[index];
      }
    
      DOM.prototype.forEach = function forEach() {
        return Array.prototype.forEach.apply(this.element, arguments);
      }
    
      DOM.prototype.map = function map() {
        return Array.prototype.map.apply(this.element, arguments);
      }
    
      DOM.prototype.filter = function filter() {
        return Array.prototype.filter.apply(this.element, arguments);
      }
    
      DOM.prototype.reduce = function reduce() {
        return Array.prototype.reduce.apply(this.element, arguments);
      }
    
      DOM.prototype.reduceRight = function reduceRight() {
        return Array.prototype.reduceRight.apply(this.element, arguments);
      }
    
      DOM.prototype.every = function every() {
        return Array.prototype.every.apply(this.element, arguments);
      }
    
      DOM.prototype.some = function some() {
        return Array.prototype.some.apply(this.element, arguments);
      }
    
      function is(obj) {
        return Object.prototype.toString.call(obj)
      }
    
      DOM.isArray = function isArray(obj) {
        return is(obj) === '[object Array]';
      }
    
      DOM.isFunction = function isFunction(obj) {
        return is(obj) === '[object Function]';
      }
    
      DOM.isNumber = function isNumber(obj) {
        return is(obj) === '[object Number]';
      }
    
      DOM.isString = function isString(obj) {
        return is(obj) === '[object String]';
      }
    
      DOM.isBoolean = function isBoolean(obj) {
        return is(obj) === '[object Boolean]';
      }
    
      DOM.isNull = function isNull(obj) {
        return is(obj) === '[object Null]';
      }

      window.DOM = DOM;

})();