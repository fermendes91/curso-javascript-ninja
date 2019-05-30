'use strict';

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;
var routes = require('./routes');

var cars = [];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.json({ message: 'hi' });
});

app.get('/cars', function(request, response) {
  response.json(cars);
});

app.post('/car', function(request, response) {
  var car = {
    imagem: request.body.imagem,
    marca: request.body.marca,
    modelo: request.body.modelo,
    ano: request.body.ano,
    placa: request.body.placa,
    cor: request.body.cor
  }
  console.log(car);

  cars.push(car);

  response.json(cars);
});

app.use('/car', routes);

app.listen(port, function() {
  console.log('Listening on port http://localhost:%d', port);
});
