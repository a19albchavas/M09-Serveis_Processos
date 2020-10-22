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


app.get('/', function (req, res)
{
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Mensaje de prueba satisfactorio.'
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

app.route('/jugador/:user')
    .get(function (req, res)
    {
        respuesta.error = true;
        for (var i = 0; i < jugadores.length; i++)
        {
            if (jugadores[i].alies == req.params.user)
            {
                res.send(jugadores[i]);
                respuesta.error = false;
            }
        }
        if (respuesta.error == true)
        {
            respuesta = {
                error: true,
                codigo: 504,
                mensaje: "El jugador no existeix encara"
            }
            res.send(respuesta);
        }
    })

    .post(function (req, res)
    {
        var playerName = req.body.nom || '';
        var playerSurname = req.body.congnom || '';
        var playerScore = req.body.score || '';
        var playerNick = req.body.alies || '';
        var playerRank = req.body.posicio || '';
        respuesta.error = false;

        if (playerName == '' || playerSurname == '' || parseInt(playerScore) <= 0 || playerNick == '' || playerRank == '')
        {
            respuesta = {
                error: true,
                codigo: 502,
                mensaje: 'Es necessiten tots els valors de nom, cognom, puntuació (sempre positiva), alies i la posició'
            };
        } 
        else if (playerNick != req.params.user) {
            respuesta = {
                error: true,
                codigo: 506,
                mensaje: "L'àlies és incorrecte"
            };
        } 
        else 
        {
            for (var i = 0; i < jugadores.length ; i++)
            {
                if ((jugadores[i].nom == playerName) && (jugadores[i].congnom == playerSurname) && (jugadores[i].alies == playerNick)) 
                {
                    respuesta = {
                        Codi: 503,
                        error: true,
                        mensaje: "El jugador ja existeix"
                    };
                }
            }
            if(!respuesta.error)
            {
                jugadores.push(
                    {
                        posicio: playerRank,
                        alies: playerNick,
                        nom: playerName,
                        congnom: playerSurname,
                        score: playerScore
                    }
                ) 
    
                respuesta = {
                    codigo: 200,                 
                    error: false,                
                    mensaje: 'Jugador creat',   
                    respuesta: jugadores[jugadores.length - 1]          
                };
            }
        }
        res.send(respuesta);
    })
    .put(function (req, res)
    {
        var playerName = req.body.nom || '';
        var playerSurname = req.body.congnom || '';
        var playerScore = req.body.score || '';
        var playerNick = req.body.alies || '';
        var playerRank = req.body.posicio || '';
        respuesta.error = false;

        if (playerName == '' || playerSurname == '' || parseInt(playerScore) <= 0 || playerNick == '' || playerRank == '')
        {
            respuesta = {
                error: true,
                codigo: 502,
                mensaje: 'Es necessiten tots els valors de nom, cognom, puntuació (sempre positiva), alies i la posició'
            };
        } 
        else if (playerNick != req.params.user) {
            respuesta = {
                error: true,
                codigo: 504,
                mensaje: "El jugador no existeix encara"
            };
        } 
        else 
        {
            for (var i = 0; i < jugadores.length ; i++)
            {
                if ((jugadores[i].nom == playerName) && (jugadores[i].congnom == playerSurname) && (jugadores[i].alies == playerNick)) 
                {
                    jugadores[i] = {
                        posicio: playerRank,
                        alies: playerNick,
                        nom: playerName,
                        congnom: playerSurname,
                        score: playerScore
                    };
                    respuesta = {
                        error: false,
                        codigo: 505,
                        mensaje: 'Jugador actualitzat',
                        respuesta: jugadores[i]
                    };
                    respuesta.error = true;
                }
            }
            if(!respuesta.error)
            {
                respuesta = {
                    error: true,
                    codigo: 504,
                    mensaje: 'El jugador no existeix'
                };
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