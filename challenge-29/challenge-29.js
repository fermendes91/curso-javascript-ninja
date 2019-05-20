(function(DOM) {
  'use strict';

  function app() {
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

    var $submitCar = new DOM('[event-js=submitCar]');
    var $tbody = new DOM('tbody').get()[0];

    // inputFields 
    var $inputImagem = new DOM('[name=imagem]').get()[0];
    var $inputMarca = new DOM('[name=marca]').get()[0];
    var $inputModelo = new DOM('[name=modelo]').get()[0];
    var $inputAno = new DOM('[name=ano]').get()[0];
    var $inputPlaca = new DOM('[name=placa]').get()[0];
    var $inputCor = new DOM('[name=cor]').get()[0];

    $submitCar.on('click', handleSubmitCar);

    function handleSubmitCar() {
      if(validateFields()) {
        var $msgCarrosNaoCadastrados = new DOM('[name=msgSemCadastro').get()[0];
        if($msgCarrosNaoCadastrados)
          $msgCarrosNaoCadastrados.parentElement.removeChild($msgCarrosNaoCadastrados);

        var car = {
          imagem: $inputImagem.value,
          marca: $inputMarca.value,
          modelo: $inputModelo.value,
          ano: $inputAno.value,
          placa: $inputPlaca.value,
          cor: $inputCor.value
        }

        insertLine(car);

        function insertLine() {
          var newLine = document.createElement('tr');
          
          for(var i = 0; i < Object.keys(car).length; i++) {
            var newCell = document.createElement('td');
            if(i === 0) {
              var newCell = document.createElement('td');
              var img = document.createElement('img');
              img.setAttribute('src', Object.values(car)[i]);
              newCell.appendChild(img);
            } else {
              newCell.textContent = Object.values(car)[i];
            }
            newLine.appendChild(newCell);
          }

          $tbody.appendChild(newLine);
        }

        clearInputFields();
        return;
      }

      alert('Todos os campos devem ser preenchidos');
    }

    function validateFields() {
      return $inputImagem.value &&
        $inputMarca.value &&
        $inputModelo.value &&
        $inputAno.value &&
        $inputPlaca.value && 
        $inputCor.value;
    }

    function clearInputFields() {
        $inputImagem.value = '';
        $inputMarca.value = '';
        $inputModelo.value = '';
        $inputAno.value = '';
        $inputPlaca.value = '';
        $inputCor.value = '';
    }

    function loadCompanyInfo() {

      var $companyName = new DOM('[data-js=company-name').get()[0];
      var $companyPhone = new DOM('[data-js=company-phone').get()[0];

      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'company.json');
      xhr.send();

      xhr.addEventListener('readystatechange', handleGetCompanyInfo)

      function handleGetCompanyInfo() {
        if(xhr.status === 200 && xhr.readyState === 4) {
          var response = JSON.parse(xhr.responseText);
          
          $companyName.textContent = response.name;
          $companyPhone.textContent = response.phone;

        }
      }
    }

    loadCompanyInfo();
}

window.app = app();


})(window.DOM);
