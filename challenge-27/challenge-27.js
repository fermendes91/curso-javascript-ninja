(function () {

/*
Aproveitando a lib DOM que fizemos na semana anterior, crie agora para ela
métodos semelhantes aos que existem no array, mas que sirvam para os
elementos do DOM selecionados.
Crie os seguintes métodos:
- forEach, map, filter, reduce, reduceRight, every e some.

Crie também métodos que verificam o tipo do objeto passado por parâmetro.
Esses métodos não precisam depender de criar um novo elmento do DOM, podem
ser métodos estáticos.

Métodos estáticos não obrigam o uso do `new`, podendo ser usados diretamente
no objeto, como nos exemplos abaixo:
DOM.isArray([1, 2, 3]); // true
DOM.isFunction(function() {}); // true
DOM.isNumber('numero'); // false

Crie os seguintes métodos para verificação de tipo:
- isArray, isObject, isFunction, isNumber, isString, isBoolean, isNull.
O método isNull deve retornar `true` se o valor for null ou undefined.
*/

    function DOM(nodeString) {
        this.element = document.querySelectorAll(nodeString);
    }

    DOM.prototype.on = function on(eventType, callback) {
        Array.prototype.forEach.call(this.element, function(element) {
            element.addEventListener(eventType, callback, false);
        });
    }

    DOM.prototype.off = function off(eventType, callback) {
        Array.prototype.forEach.call(this.element, function(element) {
            element.removeEventListener(eventType, callback, false);
        });
    }

    DOM.prototype.get = function get() {
        return this.element;
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


    var $a = new DOM('[data-js="link"]');
    $a.on('click', function handleClick(e) {
    e.preventDefault();
    console.log('clicou');
    $a.off('click', handleClick)
    });

    // testando o forEach, map, filter...
    $a.forEach(function(item) {
        console.log(item.firstChild.nodeValue);
    })

    var dataJs = $a.map(function(item) {
        return item.getAttribute('data-js');
    })
    console.log(dataJs);

    var filterA = $a.filter(function(item) {
        return item.getAttribute('href') === 'link2'; 
    });
    console.log(filterA);

    var reduceA = $a.reduce(function(acc, item, index) {
        return acc + ' ' + item.getAttribute('data-js') + index;
    }, '');
    console.log(reduceA);

    // Verificando tipos de objetos.

    var array = [1, 2, 3];
    console.log('é um array', DOM.isArray(array));

    var func = function() {};
    console.log('é uma funcao', DOM.isFunction(func));

    var number = 91;
    console.log('é um numerico', DOM.isNumber(number));



})();
