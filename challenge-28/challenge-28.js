  /*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."

  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
  */

  (function () {
    var ajax = new XMLHttpRequest;

    var $inputCEP = document.querySelector('#cep');

    $inputCEP.addEventListener('input', buscaCEP);

    function buscaCEP(event) {
      var cep_code = event.target.value;
      var regexOnlyNumbers = /(\d+)/g;

      cep_code = cep_code.match(regexOnlyNumbers).join('');
    
      if(cep_code.length === 8) {
        cep_code = cep_code.slice(0, 5) + '-' + cep_code.slice(5);
        
        ajax.open('GET', 'http://apps.widenet.com.br/busca-cep/api/cep.json?code=' + cep_code);
        ajax.send();

        ajax.addEventListener('readystatechange', function() {
          if(isRequestOK) {
            var addressObj = JSON.parse(ajax.responseText);

            if(addressObj.status) {
              populateAddressFields(addressObj);
            } else {
              console.log('CEP Não encontrado');
              populateAddressFields(addressObj);
            }
           
          }

        });

        function populateAddressFields(addressObj) {
          document.querySelector('#logradouro').value = addressObj.address || null;
          document.querySelector('#bairro').value = addressObj.district || null;
          document.querySelector('#estado').value = addressObj.state || null;
          document.querySelector('#cidade').value = addressObj.city || null;
          document.querySelector('#cepContent').value = addressObj.code || null;
        }

        function isRequestOK(ajax) {
          return ajax.readyState === 4 && ajax.status === 200;
        }


      }

    }
  })();