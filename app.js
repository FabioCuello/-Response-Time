const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const app = express();
// ---------------------------------------------------
var lengthCicloA = 0
var lengthCicloB = 0
let prueba = 0
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
const connection = mysql.createConnection({
    host: 'db4free.net',
    user: "pilotodb2",
    password: "pilotodb123",
    database: "pilotopruebadb2",
});


app.get("/", async function (req, res) {

    // Conectamos con el servidor

    // Buscamos en el servidor
    connection.query('SELECT* FROM `PROFESOR`', async function (err, results, fields) {
        if (err) {
            console.log("error in query " + err)
        } else {
            // En caso de haber conectado exitosamente hacemos paso de las variables obtenidas a un html
            lengthCicloA = results.length;
            res.render("index", {
                tecla: await results[results.length - 1].tecla,
                ProbabilidadVerde: await results[results.length - 1].ProbabilidadVerde,
                tiempoDeImagen: await results[results.length - 1].TiempoDeImg,
                tiempoDeFondo: await results[results.length - 1].TiempoDeFondo,
                numeroDeImagenes: await results[results.length - 1].NumeroDeImg,
                color: await results[results.length - 1].Color,
                nombre: await results[results.length - 1].Nombre
            });
            // Cerramos conexion
        };
    });

});
app.get("/prof", async function (req, res) {
    connection.query('SELECT* FROM `PROFESOR`', async function (err, results, fields) {
        if (err) {
            console.log("error in query " + err)
        } else {
            res.render("prof", {
                results: await results
            });
            // Cerramos conexion
        };
    });
});

app.get("/exit", function (req, res) {
    res.render("exit");
});

app.post("/", async function (req, res) {
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
    var query = connection.query('INSERT INTO PRUEBA SET ?', post, function (error, results, fields) {
        if (error) throw error;
        // Neat!
    });
    console.log(query.sql);
});
app.post("/exit", function (req, res) {
    res.redirect("/exit")
});

app.post("/test", async function (req, res) {
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
    console.log(req.body);
    var query = await connection.query('INSERT INTO PROFESOR SET ?', cambios, function (error, results, fields) {
        if (error) throw error;
        else {
            res.render("success");
        }
    });
    console.log(query.sql);
});

app.listen(process.env.PORT || 3000, function () {
    console.log("running");
});