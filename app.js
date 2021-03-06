'use strict';

var staticData = {
	users: {}
}; // nem életszerű, adatbázisban tárolás helyett.

var express = require('express'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    cors = require('cors'),
    app = express(),
	config = require('./config');;
   
var port = 3005;

app.use(cors());
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
      {
         "id": 5,
         "name": "ribizli"
      },
      {
         "id": 6,
         "name": "eper"
      },
      {
         "id": 7,
         "name": "málna"
      },
      {
         "id": 8,
         "name": "narancs"
      },
      {
         "id": 9,
         "name": "banán"
      },
      {
         "id": 10,
         "name": "dinnye"
      },
      {
         "id": 11,
         "name": "mangó"
      },
      {
         "id": 12,
         "name": "piszke"
      },
      {
         "id": 13,
         "name": "barack"
      },
      {
         "id": 14,
         "name": "meggy"
      },
      {
         "id": 15,
         "name": "cseresznye"
      },
      {
         "id": 16,
         "name": "áfonya"
      },
      {
         "id": 17,
         "name": "kivi"
      },
      {
         "id": 18,
         "name": "füge"
      },
      {
         "id": 19,
         "name": "citrom"
      },
      {
         "id": 20,
         "name": "maracuja"
      },
      {
         "id": 21,
         "name": "avokádó"
      },
      {
         "id": 22,
         "name": "papaja"
      }
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
      {
         "id": 5,
         "name": "ribizli",
         "description": ""
      },
      {
         "id": 6,
         "name": "eper",
         "description": ""
      },
      {
         "id": 7,
         "name": "málna",
         "description": ""
      },
      {
         "id": 8,
         "name": "narancs",
         "description": ""
      },
      {
         "id": 9,
         "name": "banán",
         "description": ""
      },
      {
         "id": 10,
         "name": "dinnye",
         "description": ""
      },
      {
         "id": 11,
         "name": "mangó",
         "description": ""
      },
      {
         "id": 12,
         "name": "piszke",
         "description": ""
      },
      {
         "id": 13,
         "name": "barack",
         "description": ""
      },
      {
         "id": 14,
         "name": "meggy",
         "description": ""
      },
      {
         "id": 15,
         "name": "cseresznye",
         "description": ""
      },
      {
         "id": 16,
         "name": "áfonya",
         "description": ""
      },
      {
         "id": 17,
         "name": "kivi",
         "description": ""
      },
      {
         "id": 18,
         "name": "füge",
         "description": ""
      },
      {
         "id": 19,
         "name": "citrom",
         "description": ""
      },
      {
         "id": 20,
         "name": "maracuja",
         "description": ""
      },
      {
         "id": 21,
         "name": "avokádó",
         "description": ""
      },
      {
         "id": 22,
         "name": "papaja",
         "description": ""
      }
   ];
   
   for (var i in resJSON) {
      if (resJSON[i].id == req.params.id) {
         res.send(resJSON[i]);
         return;
      }
   }
   res.status(404).send('Nem létező id: ' + req.params.id + '.');
});

app.get('/param/:a', function (req, res) {
	res.type('application/json');
	var resObj = {
		path_params: req.params,
		get_params: req.query,
		body_params: req.body,
		header_data: req.headers
	}
	res.send(resObj);
});

app.post('/param/:a', function (req, res) {
	res.type('application/json');
	var resObj = {
		path_params: req.params,
		get_params: req.query,
		body_params: req.body,
		header_data: req.headers
	}
	res.send(resObj);
});

app.put('/param/:a', function(req, res) {
	res.type('application/json');
    var resObj = {
		path_params: req.params,
		get_params: req.query,
		body_params: req.body,
		header_data: req.headers
	}
	res.send(resObj);
});

app.delete('/param/:a', function(req, res) {
	res.type('application/json');
    var resObj = {
		path_params: req.params,
		get_params: req.query,
		body_params: req.body,
		header_data: req.headers
	}
	res.send(resObj);
});

app.get('/static-data', function (req, res) {
	var token = req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, config.secret, function(err, decoded) {
			if (err) {
				return res.json({
					success: false,
					msg: 'Token hitelesítése sikertelen.'
				});
			} else {
				req.decoded = decoded;
				// next();
				if(staticData.users[decoded.name] && staticData.users[decoded.name].password === decoded.password) {
					res.json(staticData);
				} else {
					res.status(403);
						res.json({
						succes: false,
						msg: 'Érvénytelen token.'
					});
				}
			}
		});
	} else {
		res.status(403);
		res.json({
			succes: false,
			msg: 'Nem érkezett token.'
		});
	}
});

app.post('/setup', function(req, res) {
	// create a sample user
	var user = { 
		name: req.body.name, 
		password: req.body.pass,
	};
	if(staticData.users[user.name]) {
		res.json({succes: false, msg: 'Már létező felhasználó.'});
	} else {
		staticData.users[user.name] = user;
		res.json({success: true});
	}

});

app.post('/login', function(req, res) {
	console.log(staticData.users);
	if (staticData.users[req.body.name] === undefined) {
		res.json({
			success: false,
			msg: 'Nem létező felhasználó.'
		});
	} else if (staticData.users[req.body.name].password !== req.body.pass) {
		res.json({
			success: false,
			msg: 'Rossz jelszó.'
		});
	} else {
		var token = jwt.sign(staticData.users[req.body.name], config.secret, { exoiresInMinutes: 1440 });
		res.json({
			success: true,
			token: token
		});
	}
});


app.listen(port);
console.log('Minta válaszok port=' + port);