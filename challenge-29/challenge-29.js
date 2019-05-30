(function(DOM) {
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

      
      init: function init() {
        this.loadCompanyInfo();
        this.initEvents();
      },
      loadCompanyInfo: function loadCompanyInfo() {
                
        var $companyName = new DOM('[data-js=company-name').get();
        var $companyPhone = new DOM('[data-js=company-phone').get();
  
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'company.json');
        xhr.send();
  
        xhr.addEventListener('readystatechange', handleGetCompanyInfo);
''
        DOM('[name=imagem]').get().value = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0m5JIwJc-Yp63se2fAHjrSUPf47agv1HeTuIBs1fQgA6Ct0Le8w';
        DOM('[name=marca]').get().value = 'Marca';
        DOM('[name=modelo]').get().value = 'Modelo';
        DOM('[name=ano]').get().value = 1999
        DOM('[name=placa]').get().value = 'AVK-8314';
        DOM('[name=cor]').get().value = 'Vermelho';
  
        function handleGetCompanyInfo() {
          if(xhr.status === 200 && xhr.readyState === 4) {
            var response = JSON.parse(xhr.responseText);
            
            $companyName.textContent = response.name;
            $companyPhone.textContent = response.phone;
          }
        }
      },
      initEvents: function initEvents() {
        var $submitCar = DOM('[event-js=submitCar]');
        $submitCar.on('click', this.handleSubmitCar);
      },
      handleSubmitCar: function handleSubmitCar() {        
        var $tbody = DOM('tbody').get();
        var car = getFieldValues();

        function getFieldValues() {
          return {
            imagem: new DOM('[name=imagem]').get().value,
            marca: new DOM('[name=marca]').get().value,
            modelo: new DOM('[name=modelo]').get().value,
            ano: new DOM('[name=ano]').get().value,
            placa: new DOM('[name=placa]').get().value,
            cor: new DOM('[name=cor]').get().value
          }
        }

        if(validateFields(car)) {
          var $msgCarrosNaoCadastrados = new DOM('[name=msgSemCadastro').get();
          if($msgCarrosNaoCadastrados)
            $msgCarrosNaoCadastrados.parentElement.removeChild($msgCarrosNaoCadastrados);
    
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
            
            app.createEventForRow(newLine);
            
            $tbody.appendChild(newLine);
          }
  
          app.clearInputFields();
          return;
        }

        function validateFields(car) {
          return car.imagem && car.marca && car.modelo && car.ano && car.placa && car.cor;
        }
  
        alert('Todos os campos devem ser preenchidos');
      },

      createEventForRow: function createEventForRow(line) {
        console.log('FUNCTION createEventForRow');

        var $lastTD = document.createElement('td');
        var $spanEdit = document.createElement('a');
        var $spanRemove = document.createElement('a');

        $spanEdit.textContent = 'E';
        $spanRemove.textContent = 'X';
        
        $lastTD.style.textAlign = 'center';
        $spanEdit.classList.add('actionTable');
        $spanRemove.classList.add('actionTable');

        $spanEdit.addEventListener('click', updateCar, false);
        $spanRemove.addEventListener('click', removeCar, false);

        $lastTD.appendChild($spanEdit);
        $lastTD.appendChild($spanRemove);

        line.appendChild($lastTD);

        function updateCar(event) {
          var $tds = event.srcElement.parentElement.parentElement.childNodes;

          new DOM('[name=imagem]').get().value = $tds[0].childNodes[0].getAttribute('src');
          new DOM('[name=marca]').get().value =  $tds[1].textContent;
          new DOM('[name=modelo]').get().value = $tds[2].textContent;
          new DOM('[name=ano]').get().value = $tds[3].textContent;
          new DOM('[name=placa]').get().value = $tds[4].textContent;
          new DOM('[name=cor]').get().value = $tds[5].textContent;

          var $btnCadastrar = DOM('[event-js=submitCar]').get();
          $btnCadastrar.setAttribute('value', 'Atualizar');

          $btnCadastrar.addEventListener('click', handleUpdateCar);

          function handleUpdateCar() {
            console.log('update car');
          }
            
        }

        function removeCar(event) {
          var $tr = event.srcElement.parentElement.parentElement;
          $tr.parentElement.removeChild($tr);
        }

      },

      clearInputFields: function clearInputFields() {
        new DOM('[name=imagem]').get().value = '';
        new DOM('[name=marca]').get().value = '';
        new DOM('[name=modelo]').get().value = '';
        new DOM('[name=ano]').get().value = '';
        new DOM('[name=placa]').get().value = '';
        new DOM('[name=cor]').get().value = '';
      }
    }

}();

app.init();

})(window.DOM);
