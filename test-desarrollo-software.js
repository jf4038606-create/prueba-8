
/* =========================================
   TEST VOCACIONAL - DESARROLLO DE SOFTWARE
   Funcionamiento del cuestionario
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTOS HTML

    const bienvenida = document.getElementById("bienvenida");
    const pantallaPreguntas = document.getElementById("pantalla-preguntas");
    const pantallaResultados = document.getElementById("pantalla-resultados");

    const botonComenzar = document.getElementById("comenzar");
    const botonAnterior = document.getElementById("anterior");
    const botonSiguiente = document.getElementById("siguiente");
    const botonRepetir = document.getElementById("repetir");

    const numeroPregunta = document.getElementById("numero-pregunta");
    const textoProgreso = document.getElementById("texto-progreso");
    const barraProgreso = document.getElementById("barra-progreso");
    const progresoActual = document.getElementById("progreso-actual");

    const categoriaPregunta = document.getElementById("categoria-pregunta");
    const textoPregunta = document.getElementById("texto-pregunta");
    const opcionesContenedor = document.getElementById("opciones");
    const tarjetaPregunta = document.querySelector(".tarjeta-pregunta");
    const mensajeError = document.getElementById("mensaje-error");

    const puntuacion = document.getElementById("puntuacion");
    const barraResultado = document.getElementById("barra-resultado");
    const progresoResultado = document.getElementById("progreso-resultado");
    const tituloResultado = document.getElementById("titulo-resultado");
    const descripcionPerfil = document.getElementById("descripcion-perfil");
    const listaRecomendaciones = document.getElementById("lista-recomendaciones");


    // PREGUNTAS DEL TEST
    // Las puntuaciones representan preferencias declaradas,
    // no una medición científica de capacidad.

    const preguntas = [

        {
            categoria: "LÓGICA Y RAZONAMIENTO",
            pregunta: "¿Cómo te sientes al resolver un problema que requiere pensar paso a paso?",
            opciones: [
                {
                    texto: "Me gusta analizarlo y encontrar una solución.",
                    valor: 3
                },
                {
                    texto: "Lo intento, aunque a veces necesito orientación.",
                    valor: 2
                },
                {
                    texto: "Prefiero actividades que no requieran tanto razonamiento.",
                    valor: 1
                }
            ]
        },

        {
            categoria: "TECNOLOGÍA",
            pregunta: "Cuando utilizas una aplicación o un videojuego, ¿te da curiosidad saber cómo funciona?",
            opciones: [
                {
                    texto: "Sí, me interesa descubrir cómo está hecho.",
                    valor: 3
                },
                {
                    texto: "A veces me pregunto cómo funciona.",
                    valor: 2
                },
                {
                    texto: "Me interesa más utilizarlo que conocer su funcionamiento.",
                    valor: 1
                }
            ]
        },

        {
            categoria: "CREATIVIDAD",
            pregunta: "¿Qué te parecería crear una página web con tus propias ideas?",
            opciones: [
                {
                    texto: "Me entusiasma diseñarla y probar diferentes ideas.",
                    valor: 3
                },
                {
                    texto: "Me gustaría intentarlo para aprender.",
                    valor: 2
                },
                {
                    texto: "Por ahora prefiero otras actividades.",
                    valor: 1
                }
            ]
        },

        {
            categoria: "RESOLUCIÓN DE PROBLEMAS",
            pregunta: "Si un programa no funciona como esperabas, ¿qué harías?",
            opciones: [
                {
                    texto: "Buscaría el error e intentaría solucionarlo.",
                    valor: 3
                },
                {
                    texto: "Pediría ayuda y trataría de entender la solución.",
                    valor: 2
                },
                {
                    texto: "Me resultaría difícil mantener el interés en el problema.",
                    valor: 1
                }
            ]
        },

        {
            categoria: "APRENDIZAJE",
            pregunta: "¿Cómo te sentirías aprendiendo un lenguaje de programación desde cero?",
            opciones: [
                {
                    texto: "Con ganas de practicar y descubrir qué puedo crear.",
                    valor: 3
                },
                {
                    texto: "Con curiosidad, aunque necesitaría acompañamiento.",
                    valor: 2
                },
                {
                    texto: "No es algo que me interese mucho actualmente.",
                    valor: 1
                }
            ]
        },

        {
            categoria: "ATENCIÓN AL DETALLE",
            pregunta: "Cuando realizas una tarea, ¿cómo te llevas con revisar los detalles para encontrar errores?",
            opciones: [
                {
                    texto: "Me gusta revisar y corregir lo que haga falta.",
                    valor: 3
                },
                {
                    texto: "Lo hago cuando es necesario, aunque me cuesta un poco.",
                    valor: 2
                },
                {
                    texto: "Prefiero tareas en las que no tenga que revisar tantos detalles.",
                    valor: 1
                }
            ]
        },

        {
            categoria: "TRABAJO EN EQUIPO",
            pregunta: "¿Qué opinas de colaborar con otras personas para crear una aplicación o un sitio web?",
            opciones: [
                {
                    texto: "Me gusta compartir ideas y construir algo en equipo.",
                    valor: 3
                },
                {
                    texto: "Podría hacerlo si nos organizamos bien.",
                    valor: 2
                },
                {
                    texto: "Prefiero realizar otro tipo de actividades.",
                    valor: 1
                }
            ]
        },

        {
            categoria: "INTERESES PERSONALES",
            pregunta: "¿Qué tan interesado estarías en crear herramientas digitales que ayuden a resolver necesidades reales?",
            opciones: [
                {
                    texto: "Mucho; me gustaría crear soluciones útiles.",
                    valor: 3
                },
                {
                    texto: "Me interesaría conocer más sobre esa posibilidad.",
                    valor: 2
                },
                {
                    texto: "Por ahora no es un tema que me llame la atención.",
                    valor: 1
                }
            ]
        }

    ];


    // ESTADO DEL TEST

    let preguntaActual = 0;
    let respuestas = new Array(preguntas.length).fill(null);


    // MOSTRAR UNA PANTALLA

    function mostrarPantalla(pantalla) {

        bienvenida.hidden = true;
        pantallaPreguntas.hidden = true;
        pantallaResultados.hidden = true;

        pantalla.hidden = false;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    // COMENZAR EL TEST

    function comenzarTest() {

        preguntaActual = 0;
        respuestas = new Array(preguntas.length).fill(null);

        mostrarPantalla(pantallaPreguntas);
        mostrarPregunta();
    }


    // MOSTRAR LA PREGUNTA ACTUAL

    function mostrarPregunta() {

        const pregunta = preguntas[preguntaActual];

        const numeroVisible = String(preguntaActual + 1).padStart(2, "0");

        numeroPregunta.textContent =
            `${numeroVisible} / ${String(preguntas.length).padStart(2, "0")}`;

        categoriaPregunta.textContent = pregunta.categoria;
        textoPregunta.textContent = pregunta.pregunta;

        opcionesContenedor.replaceChildren();
        mensajeError.hidden = true;

        pregunta.opciones.forEach((opcion, indice) => {

            const boton = document.createElement("button");

            boton.type = "button";
            boton.className = "opcion";

            boton.setAttribute(
                "aria-pressed",
                respuestas[preguntaActual] === indice ? "true" : "false"
            );

            const marcador = document.createElement("span");
            marcador.className = "marcador-opcion";
            marcador.setAttribute("aria-hidden", "true");
            marcador.textContent =
                respuestas[preguntaActual] === indice
                    ? "✓"
                    : String.fromCharCode(65 + indice);

            const texto = document.createElement("span");
            texto.className = "texto-opcion";
            texto.textContent = opcion.texto;

            boton.append(marcador, texto);

            if (respuestas[preguntaActual] === indice) {
                boton.classList.add("seleccionada");
            }

            boton.addEventListener("click", () => {
                seleccionarOpcion(indice);
            });

            opcionesContenedor.appendChild(boton);

        });

        actualizarProgreso();

        // Animar la tarjeta al cambiar de pregunta
        tarjetaPregunta.classList.remove("animar-pregunta");

       // Reiniciar la animación para que se reproduzca en cada pregunta
        void tarjetaPregunta.offsetWidth;

        tarjetaPregunta.classList.add("animar-pregunta");

        // Facilitar la navegación con teclado y lectores de pantalla
        textoPregunta.setAttribute("tabindex", "-1");
        textoPregunta.focus({ preventScroll: true });

        botonAnterior.disabled = preguntaActual === 0;

        if (preguntaActual === preguntas.length - 1) {
            botonSiguiente.innerHTML = 'Ver resultado <span aria-hidden="true">→</span>';
        } else {
            botonSiguiente.innerHTML = 'Siguiente <span aria-hidden="true">→</span>';
        }

    }


    // SELECCIONAR UNA RESPUESTA

    function seleccionarOpcion(indice) {

        respuestas[preguntaActual] = indice;
        mensajeError.hidden = true;

        const botones = opcionesContenedor.querySelectorAll(".opcion");

        botones.forEach((boton, posicion) => {

            const seleccionada = posicion === indice;

            boton.classList.toggle("seleccionada", seleccionada);
            boton.setAttribute(
                "aria-pressed",
                seleccionada ? "true" : "false"
            );

            const marcador = boton.querySelector(".marcador-opcion");

            marcador.textContent = seleccionada
                ? "✓"
                : String.fromCharCode(65 + posicion);

        });

    }


    // ACTUALIZAR LA BARRA DE PROGRESO

    function actualizarProgreso() {

        const porcentaje = Math.round(
            ((preguntaActual + 1) / preguntas.length) * 100
        );

        progresoActual.style.width = `${porcentaje}%`;
        textoProgreso.textContent = `${porcentaje}% completado`;

        barraProgreso.setAttribute("aria-valuenow", porcentaje);

    }


    // IR A LA SIGUIENTE PREGUNTA

    function siguientePregunta() {

        if (respuestas[preguntaActual] === null) {

            mensajeError.hidden = false;
            return;

        }

        if (preguntaActual < preguntas.length - 1) {

            preguntaActual++;
            mostrarPregunta();

        } else {

            mostrarResultados();

        }

    }


    // REGRESAR A LA PREGUNTA ANTERIOR

    function anteriorPregunta() {

        if (preguntaActual > 0) {

            preguntaActual--;
            mostrarPregunta();

        }

    }


    // CALCULAR LA PUNTUACIÓN ORIENTATIVA

    function calcularPuntuacion() {

        const suma = respuestas.reduce((total, indice, posicion) => {

            return total + preguntas[posicion].opciones[indice].valor;

        }, 0);

        const minimo = preguntas.length;
        const maximo = preguntas.length * 3;

        // Convertir la suma a una escala de 0 a 100.
        // El valor refleja las opciones seleccionadas,
        // no la capacidad real del estudiante.

        return Math.round(
            ((suma - minimo) / (maximo - minimo)) * 100
        );

    }


    // PREPARAR LAS RECOMENDACIONES

    function mostrarRecomendaciones(recomendaciones) {

        listaRecomendaciones.replaceChildren();

        recomendaciones.forEach((recomendacion) => {

            const elemento = document.createElement("li");
            elemento.textContent = recomendacion;

            listaRecomendaciones.appendChild(elemento);

        });

    }


    // MOSTRAR EL RESULTADO

    function mostrarResultados() {

        const resultado = calcularPuntuacion();

        puntuacion.textContent = resultado;

        progresoResultado.style.width = `${resultado}%`;
        barraResultado.setAttribute("aria-valuenow", resultado);

        let titulo;
        let descripcion;
        let recomendaciones;

        if (resultado >= 70) {

            titulo = "Tus intereses conectan con el área";

            descripcion =
                "Tus respuestas muestran interés por varias actividades " +
                "relacionadas con el Desarrollo de Software. Podría ser " +
                "interesante que explores la programación, la creación " +
                "de páginas web y la resolución de problemas digitales.";

            recomendaciones = [
                "Prueba crear una página web sencilla con HTML y CSS.",
                "Explora ejercicios básicos de lógica y programación.",
                "Participa en pequeños proyectos tecnológicos, por tu cuenta o en equipo."
            ];

        } else if (resultado >= 40) {

            titulo = "Hay intereses que puedes seguir explorando";

            descripcion =
                "Tus respuestas muestran curiosidad o preferencias " +
                "parciales por algunas actividades del área. No necesitas " +
                "tener experiencia previa: puedes explorar la programación " +
                "con ejercicios sencillos y descubrir qué te gusta.";

            recomendaciones = [
                "Conoce cómo se construye una página web.",
                "Prueba un ejercicio sencillo de programación para principiantes.",
                "Identifica qué actividades tecnológicas te resultan más interesantes."
            ];

        } else {

            titulo = "Es una oportunidad para descubrir tus preferencias";

            descripcion =
                "Tus respuestas indican que, actualmente, otras actividades " +
                "podrían llamar más tu atención. Esto no significa que no " +
                "puedas aprender programación ni que esta especialización " +
                "no sea para ti. Puedes conocerla antes de tomar una decisión.";

            recomendaciones = [
                "Explora ejemplos de aplicaciones y páginas web.",
                "Conoce las asignaturas y actividades de la especialización.",
                "Habla con docentes o estudiantes para conocer cómo es el área."
            ];

        }

        tituloResultado.textContent = titulo;
        descripcionPerfil.textContent = descripcion;

        mostrarRecomendaciones(recomendaciones);

        mostrarPantalla(pantallaResultados);

    }


    // REPETIR EL TEST

    function repetirTest() {

        preguntaActual = 0;
        respuestas = new Array(preguntas.length).fill(null);

        mostrarPantalla(bienvenida);

    }


    // EVENTOS DE LOS BOTONES

    botonComenzar.addEventListener("click", comenzarTest);

    botonSiguiente.addEventListener("click", siguientePregunta);

    botonAnterior.addEventListener("click", anteriorPregunta);

    botonRepetir.addEventListener("click", repetirTest);

});
