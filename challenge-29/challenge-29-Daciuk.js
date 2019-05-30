(function($) {
  'use strict';

  var app = function appController() {
    /*
    Vamos estruturar um pequeno app utilizando módulos.
    Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
    A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
    seguinte forma:
    - No início do arquivo, deverá ter as informações da sua empresa - nome e
    telefone (já vamos ver como isso vai ser feito)
    - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
    um formulário para cadastro do carro, com os seguintes campos:
      - Imagem do carro (deverá aceitar uma URL)
      - Marca / Modelo
      - Ano
      - Placa
      - Cor
      - e um botão "Cadastrar"

    Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
    carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
    aparecer no final da tabela.

    Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
    empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
    Dê um nome para a empresa e um telefone fictício, preechendo essas informações
    no arquivo company.json que já está criado.

    Essas informações devem ser adicionadas no HTML via Ajax.

    Parte técnica:
    Separe o nosso módulo de DOM criado nas últimas aulas em
    um arquivo DOM.js.

    E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
    que será nomeado de "app".
    */

    return {
      init: function() {
        this.companyInfo();
        this.initEvents();
      },

      initEvents: function() {
        $('[data-js=form-register]').on('submit', this.handleSubmit);
      },

      handleSubmit: function handleSubmit(e) {
        e.preventDefault();
       
        var $tableCar = $('[data-js=table-car').get();
        $tableCar.appendChild(app.createNewCar());
      },

      createNewCar: function createNewCar() {
        var $fragment = document.createDocumentFragment();

        var $tr = document.createElement('tr');
        var $tdImage = document.createElement('td');
        var $tdBrand = document.createElement('td');
        var $tdYear  = document.createElement('td');
        var $tdPlate = document.createElement('td');
        var $tdColor = document.createElement('td');

        var $image = document.createElement('img');
        $image.src = $('[data-js=image]').get().value;

        $tdImage.appendChild($image);
        $tdBrand.textContent = $('[data-js=brand-model]').get().value;
        $tdYear.textContent = $('[data-js=year]').get().value;
        $tdPlate.textContent = $('[data-js=plate]').get().value;
        $tdColor.textContent = $('[data-js=color]').get().value;

        $tr.appendChild($tdImage);
        $tr.appendChild($tdBrand);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);

        return $fragment.appendChild($tr);
      },

      companyInfo: function companyInfo() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'company.json', true) // chamando de forma assincrona ( true )
        xhr.send();

        xhr.addEventListener('readystatechange', this.getCompanyInfo, false);

        console.log('COMPANY INFO: ', this)
      },

      getCompanyInfo: function getCompanyInfo() {
        console.log('GET COMPANY INFO: ', this); // o this vai representar o objeto AJAX; pois ao invocarmos estamos mudando o contexto.
      
        if(!app.isReady.call(this)) // devemos passar o escopo do isReady, o escopo do this é o do evento.
          return;

        console.log(this.responseText);
        var data = JSON.parse(this.responseText);

        var $companyName = new DOM('[data-js=company-name').get();
        var $companyPhone = new DOM('[data-js=company-phone').get();
      
        $companyName.textContent = data.name;
        $companyPhone.textContent = data.phone;
        
      },

      isReady: function isReady() {
        return this.readyState === 4 && this.status === 200;
      }
    }




}();

app.init();


})(window.DOM);
