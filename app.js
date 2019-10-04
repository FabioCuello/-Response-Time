const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const app = express();
// ---------------------------------------------------
var key = "";
// -----------------------------------------------------
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json())
// Template
app.set("view engine", "ejs");
// --------------------------------------------------------
const pool = mysql.createPool({
    connectionLimit: 50,
    host: 'db4free.net',
    user: "pilotodb2",
    password: "pilotodb123",
    database: "pilotopruebadb2",
});

//------------------------------------------- "/" route---------------------------------------
app.route("/")
    .get(function (req, res) {
        // Conectamos con el servidor

        // Buscamos en el servidor
        pool.query('SELECT* FROM `PROFESOR`', function (err, results, fields) {
            if (err) {
                console.log("error in query " + err)
            } else {
                // En caso de haber conectado exitosamente hacemos paso de las variables obtenidas a un html
                res.render("index", {
                    tecla: results[results.length - 1].tecla,
                    ProbabilidadVerde: results[results.length - 1].ProbabilidadVerde,
                    tiempoDeImagen: results[results.length - 1].TiempoDeImg,
                    tiempoDeFondo: results[results.length - 1].TiempoDeFondo,
                    numeroDeImagenes: results[results.length - 1].NumeroDeImg,
                    color: results[results.length - 1].Color,
                    nombre: results[results.length - 1].Nombre
                });
            };
        });
    })
    .post(function (req, res) {
        let prom = 0;
        req.body.tiempoDeRespuestas.forEach(function (element) {
            prom = element + prom;
        });
        var post = {
            PromedioTiempo: prom / (req.body.tiempoDeRespuestas.length),
            Registros: req.body.tiempoDeRespuestas.toString(),
            Nombre: req.body.nombre,
            Apellido: req.body.apellido,
            Edad: req.body.edad,
            GSanguineo: req.body.gSanguineo,
            NImagenes: req.body.numeroDeimagenes,
            NImagenesCorrectas: req.body.numeroDeRespuestasCorrectas,
            NImagenesFalladas: req.body.numeroDeRespuestasIncorrectas,
            Anticipos: req.body.respuestasAnticipadas,
            Omision: req.body.respuestasOmitidasinCorrectas,
            Nombre_prueba: req.body.nombrePrueba
        };
        var query = pool.query('INSERT INTO PRUEBA SET ?', post, function (error, results, fields) {
            if (error) {
                throw error
            } else {
                console.log(query.sql);
            };
            // Neat!
        });
    })
//----------------------------------------------- "/prof" route----------------------------------------------------------
app.route("/prof")
    .get(function (req, res) {
        pool.query('SELECT* FROM `PROFESOR`', function (err, results, fields) {
            if (err) {
                console.log("error in query " + err)
            } else {
                res.render("prof", {
                    results: results
                });
                // Cerramos conexion
            };
        });
    })
    .post(function (req, res) {
        if (req.body.tecla == "otra") {
            key = req.body.otratecla;
        } else {
            key = req.body.tecla;
        };
        var cambios = {
            ProbabilidadVerde: req.body.probabilidadVerde,
            TiempoDeImg: req.body.tiempoDeImg,
            TiempoDeFondo: req.body.tiempoDeFondo,
            NumeroDeImg: req.body.numeroDeImg,
            Color: req.body.color,
            nombre: req.body.nombre,
            tecla: key
        };
        var query = pool.query('INSERT INTO PROFESOR SET ?', cambios, function (error, results, fields) {
            if (error) throw error;
            else {
                console.log(query.sql);
                res.render("success");
            }
        });

    });
//----------------------------------------------- "/exit" route----------------------------------------------------------
app.route("/exit")
    .post(function (req, res) {
        res.render("exit");
    })

//----------------------------------------------- pool state ----------------------------------------------------------

pool.on('acquire', function (connection) {
    console.log('New connection %d acquired', connection.threadId);
});
pool.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId);
});

app.listen(process.env.PORT || 3000, function () {
    console.log("running");
});