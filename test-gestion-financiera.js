
/* =====================================================
   TEST VOCACIONAL DE GESTIÓN FINANCIERA
   Una pregunta por pantalla
   ===================================================== */

/* 1. PREGUNTAS */

const preguntas = [
    {
        texto: "Me gusta ordenar información, listas o documentos para encontrarlos fácilmente.",
        categoria: "Organización",
        area: "organizacion"
    },
    {
        texto: "Me interesa trabajar con números, comparar cantidades y encontrar diferencias.",
        categoria: "Análisis numérico",
        area: "analisis"
    },
    {
        texto: "Tengo curiosidad por aprender programas como hojas de cálculo y otras herramientas digitales.",
        categoria: "Tecnología",
        area: "tecnologia"
    },
    {
        texto: "Me gusta proponer ideas, planificar actividades o imaginar cómo funcionaría un pequeño negocio.",
        categoria: "Emprendimiento",
        area: "emprendimiento"
    },
    {
        texto: "Cuando preparo una actividad, intento organizar los materiales, el tiempo y los gastos.",
        categoria: "Organización",
        area: "organizacion"
    },
    {
        texto: "Me resulta interesante revisar tablas o gráficos y pensar qué significan los datos.",
        categoria: "Análisis numérico",
        area: "analisis"
    },
    {
        texto: "Disfruto descubrir cómo funcionan las aplicaciones o encontrar maneras digitales de hacer tareas.",
        categoria: "Tecnología",
        area: "tecnologia"
    },
    {
        texto: "Me gusta comparar opciones antes de decidir en qué utilizar recursos limitados.",
        categoria: "Análisis y decisiones",
        area: "analisis"
    },
    {
        texto: "Me interesa imaginar un producto o servicio y pensar cómo organizar un proyecto para ofrecerlo.",
        categoria: "Emprendimiento",
        area: "emprendimiento"
    },
    {
        texto: "Me esfuerzo por revisar los detalles y comprobar que los registros o cálculos estén ordenados.",
        categoria: "Organización",
        area: "organizacion"
    }
];


/* 2. OPCIONES DE RESPUESTA */

const opciones = [
    {
        texto: "No me identifica",
        valor: 0
    },
    {
        texto: "Me identifica poco",
        valor: 1
    },
    {
        texto: "Me identifica bastante",
        valor: 2
    },
    {
        texto: "Me identifica mucho",
        valor: 3
    }
];


/* 3. INFORMACIÓN DE LAS ÁREAS */

const areas = {
    organizacion: {
        titulo: "Organización y planificación",
        icono: "📋",
        descripcion:
            "Te llaman la atención el orden, la planificación y el cuidado de los detalles. Puedes explorar cómo se organizan documentos, registros y presupuestos."
    },

    analisis: {
        titulo: "Análisis numérico y decisiones",
        icono: "📊",
        descripcion:
            "Te interesa comparar información y comprender qué muestran las cantidades. Puedes explorar ejercicios de presupuestos, costos y lectura de gráficos."
    },

    tecnologia: {
        titulo: "Herramientas digitales",
        icono: "💻",
        descripcion:
            "Sientes curiosidad por utilizar tecnología para resolver tareas. Puedes practicar con hojas de cálculo, tablas y herramientas digitales de organización."
    },

    emprendimiento: {
        titulo: "Emprendimiento y proyectos",
        icono: "💡",
        descripcion:
            "Te interesan las ideas, los proyectos y cómo convertirlos en planes. Puedes explorar actividades de emprendimiento, estimación de costos y planificación."
    }
};


/* 4. ELEMENTOS HTML */

const zonaTest = document.getElementById("test-vocacional");
const formulario = document.getElementById("form-test");

const contenedorPregunta = document.getElementById("pregunta-actual");

const numeroPregunta = document.getElementById("numero-pregunta");
const indicadorPaso = document.getElementById("indicador-paso");

const barraProgreso = document.getElementById("barra-progreso");
const rellenoProgreso = document.getElementById("barra-progreso-relleno");

const porcentajeProgreso = document.getElementById("progreso-porcentaje");
const textoProgreso = document.getElementById("progreso-texto");

const mensajeValidacion = document.getElementById("mensaje-validacion");

const botonAnterior = document.getElementById("btn-anterior");
const botonSiguiente = document.getElementById("btn-siguiente");
const botonResultado = document.getElementById("btn-resultado");
const botonRepetir = document.getElementById("btn-repetir");

const seccionResultado = document.getElementById("resultado-test");


/* 5. ESTADO DEL TEST */

let preguntaActual = 0;

/*
    Cada posición corresponde a una pregunta.
    null significa que la pregunta todavía no está respondida.
*/

let respuestas = Array(preguntas.length).fill(null);


/* 6. CREAR UNA PREGUNTA */

function crearPregunta(indice) {
    const pregunta = preguntas[indice];

    const tarjeta = document.createElement("fieldset");
    tarjeta.className = "pregunta-test";
    tarjeta.id = `tarjeta-pregunta-${indice + 1}`;

    /* Encabezado */

    const encabezado = document.createElement("legend");
    encabezado.className = "cabecera-pregunta";

    const numero = document.createElement("span");
    numero.className = "numero-pregunta";
    numero.textContent = String(indice + 1).padStart(2, "0");
    numero.setAttribute("aria-hidden", "true");

    const bloqueTexto = document.createElement("span");
    bloqueTexto.className = "bloque-texto-pregunta";

    const titulo = document.createElement("span");
    titulo.className = "texto-pregunta";
    titulo.id = "titulo-pregunta-actual";
    titulo.textContent = pregunta.texto;
    titulo.tabIndex = -1;

    const categoria = document.createElement("span");
    categoria.className = "categoria-pregunta";
    categoria.textContent = pregunta.categoria;

    bloqueTexto.append(titulo, categoria);
    encabezado.append(numero, bloqueTexto);

    tarjeta.append(encabezado);

    /* Instrucción */

    const instruccion = document.createElement("p");
    instruccion.className = "instruccion-pregunta";
    instruccion.textContent =
        "Selecciona una opción para continuar.";

    tarjeta.append(instruccion);

    /* Opciones */

    const opcionesGrupo = document.createElement("div");
    opcionesGrupo.className = "opciones-pregunta";

    opciones.forEach((opcion) => {
        const etiqueta = document.createElement("label");
        etiqueta.className = "opcion-respuesta";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = "respuesta";
        input.value = String(opcion.valor);

        input.checked = respuestas[indice] === opcion.valor;
        input.setAttribute(
            "aria-label",
            opcion.texto
        );

        const textoOpcion = document.createElement("span");
        textoOpcion.textContent = opcion.texto;

        etiqueta.append(input, textoOpcion);
        opcionesGrupo.append(etiqueta);
    });

    tarjeta.append(opcionesGrupo);

    return tarjeta;
}


/* 7. MOSTRAR LA PREGUNTA ACTUAL */

function mostrarPregunta() {
    contenedorPregunta.replaceChildren();

    const tarjeta = crearPregunta(preguntaActual);

    contenedorPregunta.append(tarjeta);

    numeroPregunta.textContent =
        `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;

    indicadorPaso.textContent =
        `${String(preguntaActual + 1).padStart(2, "0")} / ${String(preguntas.length).padStart(2, "0")}`;

    botonAnterior.disabled = preguntaActual === 0;

    const esUltimaPregunta =
        preguntaActual === preguntas.length - 1;

    botonSiguiente.hidden = esUltimaPregunta;
    botonResultado.hidden = !esUltimaPregunta;

    mensajeValidacion.hidden = true;

    actualizarProgreso();
}


/* 8. ACTUALIZAR EL PROGRESO */

function actualizarProgreso() {
    const respondidas = respuestas.filter(
        respuesta => respuesta !== null
    ).length;

    const porcentaje = Math.round(
        (respondidas / preguntas.length) * 100
    );

    rellenoProgreso.style.width = `${porcentaje}%`;

    porcentajeProgreso.textContent = `${porcentaje}%`;

    textoProgreso.textContent =
        `Has respondido ${respondidas} de ${preguntas.length} preguntas.`;

    barraProgreso.setAttribute(
        "aria-valuenow",
        String(respondidas)
    );
}


/* 9. GUARDAR UNA RESPUESTA */

formulario.addEventListener("change", (evento) => {
    const elemento = evento.target;

    if (
        elemento instanceof HTMLInputElement &&
        elemento.type === "radio" &&
        elemento.name === "respuesta"
    ) {
        respuestas[preguntaActual] = Number(elemento.value);

        mensajeValidacion.hidden = true;

        actualizarProgreso();
    }
});


/* 10. COMPROBAR LA RESPUESTA ANTES DE AVANZAR */

function tieneRespuesta() {
    if (respuestas[preguntaActual] === null) {
        mensajeValidacion.textContent =
            "Selecciona una respuesta antes de continuar.";

        mensajeValidacion.hidden = false;

        const primeraOpcion = contenedorPregunta.querySelector(
            'input[name="respuesta"]'
        );

        if (primeraOpcion) {
            primeraOpcion.focus();
        }

        return false;
    }

    mensajeValidacion.hidden = true;

    return true;
}


/* 11. BOTÓN SIGUIENTE */

botonSiguiente.addEventListener("click", () => {
    if (!tieneRespuesta()) {
        return;
    }

    if (preguntaActual < preguntas.length - 1) {
        preguntaActual++;

        mostrarPregunta();

        document.getElementById("test-vocacional")
            .scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
    }
});


/* 12. BOTÓN ANTERIOR */

botonAnterior.addEventListener("click", () => {
    if (preguntaActual > 0) {
        preguntaActual--;

        mostrarPregunta();

        document.getElementById("test-vocacional")
            .scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
    }
});


/* 13. CALCULAR LAS PUNTUACIONES */

function calcularResultados() {
    let total = 0;

    const puntajes = {
        organizacion: {
            puntos: 0,
            cantidad: 0
        },

        analisis: {
            puntos: 0,
            cantidad: 0
        },

        tecnologia: {
            puntos: 0,
            cantidad: 0
        },

        emprendimiento: {
            puntos: 0,
            cantidad: 0
        }
    };

    preguntas.forEach((pregunta, indice) => {
        const valor = respuestas[indice];

        total += valor;

        puntajes[pregunta.area].puntos += valor;
        puntajes[pregunta.area].cantidad++;
    });

    /*
       Comparamos promedios para que las áreas con más preguntas
       no tengan una ventaja automática.
    */

    const areaPrincipal = Object.entries(puntajes)
        .map(([clave, datos]) => ({
            clave,
            promedio: datos.cantidad > 0
                ? datos.puntos / (datos.cantidad * 3)
                : 0
        }))
        .sort((a, b) => b.promedio - a.promedio)[0].clave;

    return {
        total,
        puntajes,
        areaPrincipal
    };
}


/* 14. PREPARAR RECOMENDACIONES */

function obtenerRecomendaciones(nivel, area) {
    const recomendacionArea = {
        organizacion:
            "Practica organizar una lista de gastos o registros en una tabla clara.",

        analisis:
            "Compara dos presupuestos sencillos y explica cuál se ajusta mejor a una meta.",

        tecnologia:
            "Prueba una hoja de cálculo básica para ordenar datos y realizar sumas.",

        emprendimiento:
            "Piensa en una idea de proyecto y anota sus materiales, costos y pasos principales."
    };

    if (nivel === "alto") {
        return [
            "Explora el plan de estudios y las actividades que se realizan en Gestión Financiera.",
            recomendacionArea[area],
            "Conversa con docentes u orientadores y compara esta especialidad con otras opciones."
        ];
    }

    if (nivel === "medio") {
        return [
            "Explora actividades de contabilidad, presupuestos y herramientas informáticas para descubrir cuáles disfrutas más.",
            recomendacionArea[area],
            "Consulta el plan de estudios y compáralo con tus intereses en otras especialidades."
        ];
    }

    return [
        "Date tiempo para explorar: un resultado bajo no significa que no puedas aprender estas habilidades.",
        "Conoce otras especialidades e identifica las asignaturas y actividades que despiertan tu curiosidad.",
        recomendacionArea[area]
    ];
}


/* 15. MOSTRAR EL RESULTADO */

function mostrarResultado() {
    if (respuestas.some(respuesta => respuesta === null)) {
        mensajeValidacion.textContent =
            "Todavía falta responder alguna pregunta. Revisa tus respuestas antes de continuar.";

        mensajeValidacion.hidden = false;

        return;
    }

    const {
        total,
        puntajes,
        areaPrincipal
    } = calcularResultados();

    let nivel;
    let titulo;
    let descripcion;
    let etiqueta;
    let icono;

    if (total >= 21) {
        nivel = "alto";

        titulo = "Tus intereses muestran una afinidad marcada";

        etiqueta = "Interés alto en las actividades exploradas";

        icono = "🌟";

        descripcion =
            "Tus respuestas muestran interés por varias actividades relacionadas con la Gestión Financiera. Vale la pena conocer sus materias y comprobar cómo te sientes al practicarlas.";
    } else if (total >= 11) {
        nivel = "medio";

        titulo = "Estás desarrollando tus intereses";

        etiqueta = "Interés en desarrollo";

        icono = "🧭";

        descripcion =
            "Tus respuestas muestran interés por algunas de las actividades exploradas. Conocer las materias y realizar ejercicios prácticos puede ayudarte a decidir si esta área encaja contigo.";
    } else {
        nivel = "explorar";

        titulo = "Estás en una etapa de exploración";

        etiqueta = "Todavía estás descubriendo tus intereses";

        icono = "🌱";

        descripcion =
            "Tus respuestas indican que quizá quieras explorar más esta área y otras alternativas. Eso es normal: los intereses también se desarrollan con nuevas experiencias y aprendizajes.";
    }

    const perfil = areas[areaPrincipal];

    document.getElementById("resultado-icono").textContent = icono;

    document.getElementById("titulo-resultado").textContent = titulo;

    document.getElementById("resultado-descripcion").textContent =
        descripcion;

    document.getElementById("puntuacion-total").textContent =
        String(total);

    document.getElementById("puntuacion-etiqueta").textContent =
        etiqueta;

    document.getElementById("perfil-icono").textContent =
        perfil.icono;

    document.getElementById("perfil-titulo").textContent =
        perfil.titulo;

    document.getElementById("perfil-descripcion").textContent =
        perfil.descripcion;

    /* Generar las recomendaciones */

    const lista = document.getElementById("lista-recomendaciones");

    lista.replaceChildren();

    obtenerRecomendaciones(nivel, areaPrincipal).forEach((texto) => {
        const elemento = document.createElement("li");

        elemento.textContent = texto;

        lista.append(elemento);
    });

    /* Mostrar únicamente el resultado */

    zonaTest.hidden = true;

    seccionResultado.hidden = false;

    seccionResultado.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* 16. BOTÓN VER RESULTADO */

botonResultado.addEventListener("click", () => {
    if (!tieneRespuesta()) {
        return;
    }

    mostrarResultado();
});


/* 17. VOLVER A RESPONDER */

botonRepetir.addEventListener("click", () => {
    respuestas = Array(preguntas.length).fill(null);

    preguntaActual = 0;

    seccionResultado.hidden = true;
    zonaTest.hidden = false;

    mostrarPregunta();

    zonaTest.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});


/* 18. AÑO AUTOMÁTICO DEL PIE DE PÁGINA */

const anioPie = document.getElementById("anio-pie");

if (anioPie) {
    anioPie.textContent = String(new Date().getFullYear());
}


/* 19. INICIAR EL TEST */

mostrarPregunta();
