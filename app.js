'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    //jwt = require('jsonwebtoken'),
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
   var fruits = 
   [
      {
         "id": 1,
         "name": "alma"
      },
      {
         "id": 2,
         "name": "körte"
      },
      {
         "id": 3,
         "name": "szőlő"
      },
      {
         "id": 4,
         "name": "ananász"
      },
   ];
   
	if (!req.query.name) {
		res.send(fruits);
		return;
	}
   
	var resJSON = [];
	for (var i in fruits) {
		if (fruits[i].name.indexOf(req.query.name) > -1) {
   			resJSON.push(fruits[i]);
		}
   }
   res.send(resJSON);
});

app.get('/fruits/:id', function (req, res) {
   res.type('application/json');
   var resJSON = 
   [
      {
         "id": 1,
         "name": "alma",
         "description": "pios és fényes, de vigyázat, Hófehérke pórul járt vele... :("
      },
      {
         "id": 2,
         "name": "körte",
         "description": "Süsü szereti a vad változatát."
      },
      {
         "id": 3,
         "name": "szőlő",
         "description": "biztos van róla mese... Pl. az Arany szőlőfürt :)"
      },
      {
         "id": 4,
         "name": "ananász",
         "description": "Legalább két történetben fontos szerepet kap egy-egy epizódban."
      },
   ];
   
   for (var i in resJSON) {
      if (resJSON[i].id == req.params.id) {
         res.send(resJSON[i]);
         return;
      }
   }
   res.status(404).send('Nem létező id: ' + req.params.id + '.');
});