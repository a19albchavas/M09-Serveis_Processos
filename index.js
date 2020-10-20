const express = require("express");
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json())

let jugador = {
    nombre: '',
    apellido: '',
    score: ''
};

let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
};


app.get('/', function (req, res) {
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'eh'
    }
    res.send(respuesta);
});

app.post('/gamer', function (req, res) {
    var nom = req.body.nombre || null;
    var cognom = req.body.apellido || null;
    var puntuacio = req.body.score || null;
    if (nom == null || cognom == null || puntuacio == null)
    {
        respuesta = {
            error: true,
            codigo: 502,
            mensaje: "El campo nombre, apellido y score son requeridos"
        }
    }
    else
    {
        if (jugador.nombre == nom && jugador.apellido == cognom)
        {
            respuesta = {
                error: true,
                codigo: 503,
                mensaje: "El jugador ya fue creado previamente"
            }
        }
        else
        {
            jugador = {
                nombre: nom,
                apellido: cognom,
                score: puntuacio
            };
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: 'Jugador creado',
                gamer: jugador
            }
        }
    }
    res.send(respuesta);
});

app.get('/hola', function (req, res) {
    res.send('[GET]Hola');
});

app.listen(3000, () => {
    console.log("El sevidor está inicializado en el puerto 3000.");
});