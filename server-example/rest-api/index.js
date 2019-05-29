'use-strict';

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());

var users = [{
        username: 'fernando',
        name: 'Fernando',
        age: 28
    },{
        username: 'thaysa',
        name: 'Thaysa',
        age: 25
    },{
        username: 'bruno',
        name: 'Bruno',
        age: 23
    }];

app.get('/', function(request, response) {
    response.send('<h1>Home</h1>');
});

app.get('/user', function(request, response) {
    response.send('<h2>User</h2>')
});

app.get('/user/:username', function(request, response) {
    var username = request.params.username;
    if(hasUser(username)) {
        return response.json(users.filter(function(user) {
            return user.username === username;
        }));
    }

    return response.status(404).json({error: 'Usuario não encontrado!'});
        
});

app.post('/user', function(request, response) {
    var username = request.body.username;
    var age = request.body.age;
    var name = request.body.name;

    if(!hasUser(username)) {
        users.push({
            username: username,
            age: age,
            name: name
        });
    }

    response.json(users);
});

function hasUser(username) {
    var hasUser = users.some(function(user) {
        return user.username.toLowerCase() === username.toLowerCase();
    });

    return hasUser;
}

app.listen(3000);