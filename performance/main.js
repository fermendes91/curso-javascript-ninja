(function (win) {
    'use strict';

    var nomeDaPessoa = 'Fernando';
    function init(parametroNomePessoa) {
        console.log('hello: ' + parametroNomePessoa, unknown);
    }

    init(nomeDaPessoa);

    win.init = init;
})(window);