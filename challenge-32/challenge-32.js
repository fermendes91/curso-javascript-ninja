/*
Já temos as funcionalidades de adicionar e remover um carro. Agora, vamos persistir esses dados, 
salvando-os temporariamente na memória de um servidor.

Nesse diretório do `challenge-32` tem uma pasta `server`. É um servidor simples, em NodeJS, para 
que possamos utilizar para salvar as informações dos nossos carros.

Para utilizá-lo, você vai precisar fazer o seguinte:

- Via terminal, acesse o diretório `server`;
- execute o comando `npm install` para instalar as dependências;
- execute `node app.js` para iniciar o servidor.

Ele irá ser executado na porta 3000, que pode ser acessada via browser no endereço: 
`http://localhost:3000`

O seu projeto não precisa estar rodando junto com o servidor. Ele pode estar em outra porta.
As mudanças que você irá precisar fazer no seu projeto são:

- Para listar os carros cadastrados ao carregar o seu projeto, faça um request GET no endereço
`http://localhost:3000/car`
- Para cadastrar um novo carro, faça um POST no endereço `http://localhost:3000/car`, enviando
os seguintes campos:
  - `image` com a URL da imagem do carro;
  - `brandModel`, com a marca e modelo do carro;
  - `year`, com o ano do carro;
  - `plate`, com a placa do carro;
  - `color`, com a cor do carro.

Após enviar o POST, faça um GET no `server` e atualize a tabela para mostrar o novo carro cadastrado.

Crie uma branch `challenge-32` no seu projeto, envie um pull request lá e cole nesse arquivo a URL
do pull request.
*/
console.log('Link do pull request do seu projeto');

(function(DOM) {
  'use strict';

  var app = function appController() {
    return {
      init: function init() {
        this.getCompanyInfo();
        this.getCars();
        this.initEvents();
      },
      getCompanyInfo: function loadCompanyInfo() {
                
        var $companyName = new DOM('[data-js=company-name').get();
        var $companyPhone = new DOM('[data-js=company-phone').get();
  
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'company.json');
        xhr.send();
  
        xhr.addEventListener('readystatechange', handleGetCompanyInfo);

        function handleGetCompanyInfo() {
          if(xhr.status === 200 && xhr.readyState === 4) {
            var response = JSON.parse(xhr.responseText);
            
            $companyName.textContent = response.name;
            $companyPhone.textContent = response.phone;
          }
        }
      },
      getCars: function getCars() {
        var ajaxGet = new XMLHttpRequest();
        ajaxGet.open('GET', 'http://localhost:3000/cars');
        ajaxGet.send();

        ajaxGet.onreadystatechange = function(e) {
          if(ajaxGet.readyState === 4) {
            var cars = JSON.parse(ajaxGet.responseText);

            if(!cars.length)
              return

            var $msgCarrosNaoCadastrados = new DOM('[name=msgSemCadastro').get();
            if($msgCarrosNaoCadastrados)
              $msgCarrosNaoCadastrados.parentElement.removeChild($msgCarrosNaoCadastrados);
              
            var $tbody = DOM('tbody').get();
            while($tbody.firstChild) {
              $tbody.removeChild($tbody.firstChild);
            }
            cars.forEach(car => {
              app.insertLine(car);
            });
          }
        }
      },
      initEvents: function initEvents() {
        var $submitCar = DOM('[event-js=submitCar]');
        $submitCar.on('click', this.handleSubmitCar);
      },
      handleSubmitCar: function handleSubmitCar() {
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
          var ajaxPost = new XMLHttpRequest();
          ajaxPost.open('POST', 'http://localhost:3000/car')
          ajaxPost.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          ajaxPost.send('imagem=' + car.imagem 
            + '&marca=' + car.marca 
            + '&modelo=' + car.modelo
            + '&ano=' + car.ano
            + '&placa=' + car.placa
            + '&cor=' + car.cor);

          ajaxPost.onreadystatechange = function(e) {
            if(ajaxPost.readyState === 4 && ajaxPost.status === 200) {
              app.getCars();
            }
          }
          app.clearInputFields();
          return;
        }

        function validateFields(car) {
          return car.imagem && car.marca && car.modelo && car.ano && car.placa && car.cor;
        }
  
        alert('Todos os campos devem ser preenchidos');
      },
      insertLine: function insertLine(car) {
        var $tbody = DOM('tbody').get();
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
      },
      createEventForRow: function createEventForRow(line) {
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

