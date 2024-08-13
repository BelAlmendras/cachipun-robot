document.getElementById('start').addEventListener('click', function() {
    let numRondas = parseInt(prompt("¿Cuántas rondas quieres jugar? *BIP*:"));
    if (isNaN(numRondas) || numRondas <= 0) {
        alert("Por favor, ingresa un número más grande que 0. *BIP* *BOP*");
        return;
    }
    jugarCachipun(numRondas);
});

function jugarCachipun(numRondas) {
    let resultados = [];
    for (let i = 0; i < numRondas; i++) {
        resultados.push(jugarUnaRonda());
    }
    mostrarResultados(resultados);
}

function jugarUnaRonda() {
    let jugadaHumano = prompt("Elige tu jugada: (Puede ser piedra, papel o tijera *BIP*)").toLowerCase();
    if (!["piedra", "papel", "tijera"].includes(jugadaHumano)) {
        alert("Creo que te equivocaste. *ERROR* *ERROR* Debes elegir piedra, papel o tijera. *BIP* *BOP* *BOP*");
        return { jugadaHumano: "invalid", jugadaRobot: "", resultado: "invalid" };
    }
    let jugadaRobot = obtenerJugadaRobot();
    let resultado = determinarResultado(jugadaHumano, jugadaRobot);
    return { jugadaHumano, jugadaRobot, resultado };
}

function obtenerJugadaRobot() {
    let opciones = ["piedra", "papel", "tijera"];
    let indiceAleatorio = Math.floor(Math.random() * opciones.length);
    return opciones[indiceAleatorio];
}

function determinarResultado(jugadaHumano, jugadaRobot) {
    if (jugadaHumano === jugadaRobot) {
        return "empate";
    }
    if (
        (jugadaHumano === "piedra" && jugadaRobot === "tijera") ||
        (jugadaHumano === "papel" && jugadaRobot === "piedra") ||
        (jugadaHumano === "tijera" && jugadaRobot === "papel")
    ) {
        return "humano";
    } else {
        return "robot";
    }
}

function mostrarResultados(resultados) {
    let resultadoHTML = "";
    resultados.forEach((resultado, index) => {
        if (resultado.resultado === "invalid") {
            resultadoHTML += `<p>Ronda ${index + 1}: *ERROR* *ERROR* HUMANO FALLA</p>`;
        } else {
            resultadoHTML += `<p>Ronda ${index + 1}: Tú elegiste ${resultado.jugadaHumano}, yo robot eligir ${resultado.jugadaRobot}. ${resultado.resultado === "empate" ? "¡Empatamos! *BIP* Jueguemos de nuevo" : resultado.resultado === "humano" ? "¡Felicidades! Ganaste esta vez *BIP* (que bueno que no es con penitencia)" : "El robot ganó, o sea yo *BOP*."}</p>`;
        }
    });
    document.getElementById('resultado').innerHTML = resultadoHTML;
}

