const express = require("express");
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json())

let jugador = {
    posicio: '',
    alies: '',
    nombre: '',
    apellido: '',
    score: ''
};

let jugadores = [{
    posicio: 3,
    alies: "jperez",
    nom: "Jose",
    congnom: "Perez",
    score: 1000
},
{
    posicio: 1,
    alies: "jsanz",
    nom: "Juan",
    congnom: "Sanz",
    score: 950
},
{
    posicio: 1,
    alies: "mgutierrez",
    nom: "Maria",
    congnom: "Gutierrez",
    score: 850
}
];

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

app.get('/ranking', function (req, res)
{
    jugadores.sort((a, b) => (a.score < b.score ? 1:-1));
    for (i = 0; i < jugadores.length; i++)
    {
        jugadores[i].posicio = i + 1;
    }
    res.send(jugadores);
});


app.get('/hola', function (req, res) {
    res.send('[GET]Hola');
});

app.listen(3000, () => {
    console.log("El sevidor está inicializado en el puerto 3000.");
});