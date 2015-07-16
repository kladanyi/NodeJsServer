'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    cors = require('cors'),
    app = express();
   
app.use(cors());
var port = 3005;

app.listen(port);
console.log('Minta válaszok port=' + port);
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(function (req, res, next) {
    res.setHeader('Access-Controll-Allow-Origin', '*');
    res.setHeader('Access-Controll-Allow-Methods', 'GET,POST');
    res.setHeader('Access-Controll-Allow-Headers', 'X-Requested-With, content-type,Authorization');
    console.log(req.method, req.url);
    next();

});

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.type('text/plain');
    res.send('Szia én, egy NodeJS szerver vagyok');
});


app.get('/fruits/', function (req, res) {
   res.type('application/json');
   var resJSON = 
   [
      {
         "id": 1,
         "name": "alma"
      },
      {
         "id": 2,
         "name": "körte"
      }
   ];
   res.send(resJSON);
});