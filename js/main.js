// URL del "servidor"
const DB_URL = './data/habitaciones.txt';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Si estamos en INICIO, cargar tarjetas
    const contenedor = document.getElementById('contenedor-habitaciones');
    if (contenedor) {
        cargarHabitaciones(contenedor);
    }

    // 2. Si estamos en RESERVAS, activar calculadora
    const formReserva = document.getElementById('form-reserva');
    if (formReserva) {
        iniciarSistemaReservas();
    }
});

// --- FUNCIONES DE CARGA DE DATOS (PÁGINA INICIO) ---
async function cargarHabitaciones(elementoDOM) {
    try {
        const respuesta = await fetch(DB_URL);
        if (!respuesta.ok) throw new Error('Error conectando');
        const habitaciones = await respuesta.json();
        renderizarHabitaciones(habitaciones, elementoDOM);
    } catch (error) {
        console.error(error);
        elementoDOM.innerHTML = <p style="text-align:center; color:red">Error cargando datos. Revisa Live Server.</p>;
    }
}

function renderizarHabitaciones(datos, elementoDOM) {
    elementoDOM.innerHTML = '';
    datos.forEach(hab => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${hab.imagen}" alt="${hab.nombre}">
            <div class="card-body">
                <h3>${hab.nombre}</h3>
                <p>${hab.descripcion}</p>
                <span class="precio">$${hab.precio} / noche</span>
                <a href="reservas.html" class="btn-reserva">Reservar</a>
            </div>
        `;
        elementoDOM.appendChild(card);
    });
}

// --- FUNCIONES DE RESERVAS (CÁLCULO Y VALIDACIÓN) ---
function iniciarSistemaReservas() {
    const inputEntrada = document.getElementById('fecha-entrada');
    const inputSalida = document.getElementById('fecha-salida');
    const selectHabitacion = document.getElementById('seleccion-habitacion');
    
    const displayPrecio = document.getElementById('display-precio');
    const displayNoches = document.getElementById('display-noches');
    const displayTotal = document.getElementById('display-total');
    const mensajeError = document.getElementById('mensaje-error');

    // Escuchar cambios en los inputs para recalcular
    [inputEntrada, inputSalida, selectHabitacion].forEach(el => {
        el.addEventListener('change', calcularTotal);
    });

    function calcularTotal() {
        // 1. Obtener precio de la opción seleccionada
        // El precio está guardado en el atributo 'data-precio' del HTML
        const opcion = selectHabitacion.options[selectHabitacion.selectedIndex];
        const precio = parseFloat(opcion.dataset.precio || 0);

        // 2. Obtener fechas
        const fecha1 = new Date(inputEntrada.value);
        const fecha2 = new Date(inputSalida.value);

        // Validaciones simples
        if (!inputEntrada.value || !inputSalida.value) return;
        
        if (fecha2 <= fecha1) {
            mensajeError.innerText = "La fecha de salida debe ser después de la entrada.";
            mensajeError.style.display = "block";
            displayTotal.innerText = "$0";
            return;
        } else {
            mensajeError.style.display = "none";
        }

        // 3. Calcular diferencia de días
        const diferenciaTiempo = fecha2 - fecha1;
        const dias = diferenciaTiempo / (1000 * 3600 * 24); // Convertir milisegundos a días

        // 4. Actualizar pantalla
        displayPrecio.innerText = $${precio};
        displayNoches.innerText = dias;
        displayTotal.innerText = $${precio * dias};
    }

    // Validar al enviar el formulario
    document.getElementById('form-reserva').addEventListener('submit', (e) => {
        e.preventDefault();
        alert("¡Reserva procesada correctamente! (Simulación)");
    });
}
