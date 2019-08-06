const tiempoDeImg = parseInt(document.getElementsByClassName("oculto")[0].innerHTML, 10) * 1000;
const probabilidadVerde = parseInt(document.getElementsByClassName("oculto")[1].innerHTML, 10);
const tiempoDeFondo = parseInt(document.getElementsByClassName("oculto")[2].innerHTML, 10) * 1000;
const numeroDeimagenes = parseInt(document.getElementsByClassName("oculto")[3].innerHTML, 10);
const colorValido = document.getElementsByClassName("oculto")[4].innerHTML;
const NombrePrueba = document.getElementsByClassName("oculto")[5].innerHTML;
console.log('Probabilidad del verde:' + probabilidadVerde + "\n" +
    "Tiempo De imagenes: " + tiempoDeImg + "\n" +
    "Tiempo De Fondo: " + tiempoDeFondo +
    "\n" + "Numero de Imagenes: " + numeroDeimagenes + "\n" +
    "Color Valido: " + colorValido + "\n" + "Nombre de prueba: " + NombrePrueba);
let tiempoDeRespuestasArray = [];
let loopRespuestasArray = [];
let loopRespuestasinCorrectas = [];
let loopRespuestasOmitidasCorrectas = [];
let loopRespuestasOmitidasIncorrectas = [];
let respuestasinCorrectas = [];
let RespuestasAnticipadas = [];
let colorChoose = '';
let estadoNegro = false;
let estadoColor = false;
let colorCorrecto = false;
let listening = false;
let anticipos = false;
let juego = false;
let aviso = false;
let touchend = true;
// --------------------------------------------------------------------------------------------------------------------
let chekeo = 0;
let campos = [];
let Nombre = "";
let Edad = "";
let GSanguineo = "";
let Apellido = "";
// --------------------------------------------------------------------------------------------------------------------
var listaverde = [...Array(probabilidadVerde).keys()];
if (colorValido == "verde") {
    colorChoose = "green";
} else if (colorValido == "rojo") {
    colorChoose = "red";
};
// --------------------------------------------------------------------------------------------------------------------
class times {
    ta = 0;
    tb = 0;
    GetInitTime() {
        this.ta = new Date().getTime();
    }

    GetLastTime(x) {
        this.tb = new Date().getTime();
        if (x == "seconds") {
            console.log(Math.abs(this.tbsecon - this.tasecon));
            return (Math.abs(this.tbsecon - this.tasecon));

        } else if (x == "miliseconds") {
            return (this.tb - this.ta);

        } else {
            console.log("Invalid input");
        }
    }
}
var objeto = new times();
// -----------------------------------------
class A {
    constructor() {
        this.color = "black";
        this.caso = 0;
        this.az = 0;
    }

    cambiarImg() {
        estadoColor = true;
        estadoNegro = false;
        if (this.az in listaverde) {
            this.color = "green";
            this.caso = 1;
        } else {
            this.color = "red"
            this.caso = 2;
        };
        $("#circulo").css("background-color", this.color);
        objeto.GetInitTime();
    }
    cambiarNegro() {
        estadoColor = false;
        estadoNegro = true;
        this.color = "black";
        $("#circulo").css("background-color", "black");
        setTimeout(color, tiempoDeFondo);
        this.az = Math.floor(Math.random() * 10);
        return true;
    }
    cambiarNegroFinal() {
        this.color = "black";
        $("#circulo").css("background-color", "black");
        return true;
    }
}
var app = new A();

var timesRun = 1;

function color() {
    app.cambiarImg();
    return true;
}

function Final() {
    app.cambiarNegroFinal();
    return true;
}
// --------------------------------------------------------------------------------------------------------------------------------
// Columna Vertebral del codigo
$("a").click(checkea);
document.querySelector("a").addEventListener("touchend", checkea);

function checkea() {
    const nombre = {
        nombre: "Nombre",
        valor: document.getElementById("nombre").value
    };
    const apellido = {
        nombre: "Apellido",
        valor: document.getElementById("apellido").value
    }

    const edad = {
        nombre: "Edad",
        valor: document.getElementById("edad").value
    }

    const gSanguineo = {
        nombre: "Grupo Sanguineo",
        valor: document.getElementById("gSanguineo").value
    }

    const arrayFormulario = [nombre, apellido, edad, gSanguineo];
    arrayFormulario.forEach(function (elementFormulario) {
        if (elementFormulario.valor == "") {
            campos.push(elementFormulario.nombre);
            chekeo = 1;
        } else {
            Edad = parseInt(edad.valor, 10);
            Apellido = apellido.valor;
            Nombre = nombre.valor;
            GSanguineo = gSanguineo.valor;
        };
    });
    empieza()
}

function empieza() {
    if (chekeo == 1) {
        alert("Ops, faltan los siguientes campos: " + campos)
        campos = [];
        chekeo = 0;
    } else {
        $(".contenedorJuego").removeClass("oculto")
        // ----------------------------------------------------------------------------------------------------------------------------------
        document.addEventListener("keydown", function (event) {
            if (event.repeat == false) {
                console.log('AddEventListener------------------------------------');
                listening = true;
                if (event.key == " " && app.color == colorChoose) {
                    console.log("Correcto")
                    colorCorrecto = true;
                    // cases = 1;
                } else if (event.key == " " && app.color !== colorChoose) {
                    if (app.color == "black") {
                        anticipos = true;
                        console.log("Anticipa")
                    } else {
                        console.log("Incorrecto")
                        colorCorrecto = false;
                        // cases = 2;
                    };
                };
                if (colorCorrecto == true) {
                    var deltaT1 = objeto.GetLastTime("miliseconds");
                    loopRespuestasArray.push(deltaT1);
                    return true;
                } else if (colorCorrecto == false) {
                    loopRespuestasinCorrectas.push(1);
                    return true;
                }
                if (anticipos == true) {
                    return true;
                };
            };
            if (event.repeat == true) {
                aviso = true;
                $(".aviso").removeClass("hideDisplay");

            };
        });
        document.addEventListener("keyup", function (event) {
            if (aviso == true) {
                $(".aviso").addClass("hideDisplay");
            }
            aviso = false;
        });
        // ----------------eventos de click------
        document.addEventListener("touchstart", function (event) {
            if (touchend == true) {
                console.log('AddEventListenerTouch------------------------------------');
                touchend = false;
                // touchdown = true;
                listening = true;
                if (app.color == colorChoose) {
                    console.log("Correcto")
                    colorCorrecto = true;
                    // cases = 1;
                } else if (app.color !== colorChoose) {
                    if (app.color == "black") {
                        anticipos = true;
                        console.log("Anticipa")
                    } else {
                        console.log("Incorrecto")
                        colorCorrecto = false;
                    };
                };
                if (colorCorrecto == true) {
                    var deltaT1 = objeto.GetLastTime("miliseconds");
                    loopRespuestasArray.push(deltaT1);
                    return true;
                } else if (colorCorrecto == false) {
                    loopRespuestasinCorrectas.push(1);
                    return true;
                }
                if (anticipos == true) {
                    return true;
                };
            };
        });
        document.addEventListener("touchend", function (event) {
            console.log('touchend')
            touchend = true;
        });
        // ----------------------------------------------------------------------------------------------------------------------------------

        var interval = setInterval(function () {
            if (aviso == false && touchend == true) {
                console.log('Respuestas----------------------------------------------')
                if (listening == true && anticipos == true) {
                    RespuestasAnticipadas.push(1);
                    console.log('RespuestaAnticipada')
                };
                if (listening == true && colorCorrecto == true) {
                    tiempoDeRespuestasArray.push(loopRespuestasArray[loopRespuestasArray.length - 1]);
                    console.log('TiempoDeRespuestas: ' + tiempoDeRespuestasArray);
                    timesRun = timesRun + 1;
                } else if (listening == true && colorCorrecto == false) {
                    respuestasinCorrectas.push(loopRespuestasinCorrectas[loopRespuestasinCorrectas.length - 1]);
                    console.log('RespuestasinCorrectas: ' + respuestasinCorrectas);
                    timesRun = timesRun + 1;
                } else if (estadoNegro == false && colorChoose !== app.color && juego == true) {
                    loopRespuestasOmitidasCorrectas.push(1);
                    console.log('RespuestasOmitidasCorrectas: ' + loopRespuestasOmitidasCorrectas);
                    timesRun = timesRun + 1;
                } else if (estadoNegro == false && colorChoose == app.color && juego == true) {
                    loopRespuestasOmitidasIncorrectas.push(1);
                    console.log('RespuestasOmitidasIncorrectas: ' + loopRespuestasOmitidasIncorrectas);
                    timesRun = timesRun + 1;
                }
                console.log('Ciclo número: ' + timesRun);
            };
            if (timesRun == numeroDeimagenes + 1) {
                clearInterval(interval);
                $("#circulo").css("background-color", "black");
                var sumaRespuestasOmitidasCorrectas = 0;
                var sumaRespuestasOmitidasinCorrectas = 0;
                var sumaRespuestasAnticipadas = 0;
                var sumaRespuestasIncorrectas = 0;
                loopRespuestasOmitidasCorrectas.forEach(function (element) {
                    sumaRespuestasOmitidasCorrectas = sumaRespuestasOmitidasCorrectas + element;
                })
                loopRespuestasOmitidasIncorrectas.forEach(function (element) {
                    sumaRespuestasOmitidasinCorrectas = sumaRespuestasOmitidasinCorrectas + element;
                })
                RespuestasAnticipadas.forEach(function (element) {
                    sumaRespuestasAnticipadas = sumaRespuestasAnticipadas + element;
                })
                respuestasinCorrectas.forEach(function (element) {
                    sumaRespuestasIncorrectas = sumaRespuestasIncorrectas + element;
                })
                console.log("Respuestas anticipadas: " + sumaRespuestasAnticipadas);
                console.log('El tiempo de respuesta: ' + tiempoDeRespuestasArray);
                console.log('El numero de respuestas incorrectas: ' + respuestasinCorrectas);
                console.log("El numero de respuestas omitidas correctas es: " + sumaRespuestasOmitidasCorrectas);
                console.log("El numero de respuestas omitidas incorrectas es: " + sumaRespuestasOmitidasinCorrectas);
                // -----------------------

                var xhttp = new XMLHttpRequest();
                xhttp.open("POST", '/');
                xhttp.setRequestHeader("Content-type", 'application/json');
                var datos = {
                    respuestasAnticipadas: sumaRespuestasAnticipadas,
                    tiempoDeRespuestas: tiempoDeRespuestasArray.toString(),
                    numeroDeRespuestasCorrectas: tiempoDeRespuestasArray.length + sumaRespuestasOmitidasCorrectas,
                    numeroDeRespuestasIncorrectas: sumaRespuestasIncorrectas,
                    respuestasOmitidasCorrectas: sumaRespuestasOmitidasCorrectas,
                    respuestasOmitidasinCorrectas: sumaRespuestasOmitidasinCorrectas,
                    nombre: Nombre,
                    apellido: Apellido,
                    edad: Edad,
                    gSanguineo: GSanguineo,
                    numeroDeimagenes: numeroDeimagenes,
                    nombrePrueba: NombrePrueba
                };
                xhttp.send(JSON.stringify(datos));
                $("#bot").trigger('click');
                console.log('sending')
                return true;
            };
            juego = true;
            estadoColor = false;
            estadoNegro = false;
            listening = false;
            anticipos = false;
            app.cambiarNegro();
        }, tiempoDeFondo + tiempoDeImg);
    }
}