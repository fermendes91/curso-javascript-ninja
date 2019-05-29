(function() {
    'use strict';

    var ajaxGet = new XMLHttpRequest();

    ajaxGet.open('GET', 'http://localhost:3000/user/fernando');
    ajaxGet.send();

    ajaxGet.addEventListener('readystatechange', function(e) {
        
        // Abortar requisição caso necessario.
        /*if(ajax.readyState === 2) {
            console.log('headers ok!');
            ajax.abort();
        }*/

        if (ajaxGet.readyState === 4) {
            console.log('consulta realizada com sucesso ! \n', ajaxGet.responseText, ajaxGet.status);
        }
    }, false);

    // POST

    var ajaxPost = new XMLHttpRequest();

    ajaxPost.open('POST', 'http://localhost:3000/user');
    ajaxPost.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ajaxPost.send('username=vanessa&name=Vanessa&age=26');

    console.log('Cadastrando usuario...');
    ajaxPost.addEventListener('readystatechange', function(e) {
        if(ajaxPost.readyState === 4) {
           console.log('Cadastro realizado, segue lista atualizada', JSON.parse(ajaxPost.responseText));
        }

    });



})();