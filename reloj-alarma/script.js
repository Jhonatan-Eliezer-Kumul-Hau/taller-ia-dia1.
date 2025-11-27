// ==========================================
// RELOJ DIGITAL INTERACTIVO CON ALARMA
// ==========================================

// ==========================================
// VARIABLES GLOBALES
// ==========================================

// Estado de la alarma
let alarmaActiva = false;
let horaAlarmaConfigurada = null;
let alarmaYaSonó = false;
let formatoHora24 = true; // true = 24h, false = 12h

// Elementos del DOM
const relojElemento = document.getElementById('reloj');
const fechaElemento = document.getElementById('fecha');
const saludoElemento = document.getElementById('saludo');
const inputHoraAlarma = document.getElementById('horaAlarma');
const btnEstablecerAlarma = document.getElementById('btnEstablecerAlarma');
const btnCancelarAlarma = document.getElementById('btnCancelarAlarma');
const indicadorAlarma = document.getElementById('indicadorAlarma');
const estadoAlarma = document.getElementById('estadoAlarma');
const textoHoraAlarma = document.getElementById('textoHoraAlarma');
const notificacionAlarma = document.getElementById('notificacionAlarma');
const btnAceptarAlarma = document.getElementById('btnAceptarAlarma');
const indicadorActivoVisual = document.getElementById('indicadorActivoVisual');
const toggleFormato = document.getElementById('toggleFormato');

// ==========================================
// OBJETO CON NOMBRES DE MESES EN ESPAÑOL
// ==========================================

const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const dias = [
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
];

// ==========================================
// FUNCIÓN: FORMATEAR NÚMERO CON CEROS
// ==========================================

/**
 * Formatea un número para que tenga un dígito mínimo
 * Ejemplo: formatearNumero(5) retorna '05'
 * @param {number} num - Número a formatear
 * @returns {string} Número formateado con ceros a la izquierda
 */
function formatearNumero(num) {
    return num.toString().padStart(2, '0');
}

// ==========================================
// FUNCIÓN: OBTENER SALUDO SEGÚN LA HORA
// ==========================================

/**
 * Determina el saludo según la hora del día
 * - 00:00 a 11:59: Buenos días
 * - 12:00 a 17:59: Buenas tardes
 * - 18:00 a 23:59: Buenas noches
 * @param {number} hora - Hora actual (0-23)
 * @returns {string} Saludo correspondiente
 */
function obtenerSaludo(hora) {
    if (hora >= 0 && hora < 12) {
        return '🌅 Buenos días';
    } else if (hora >= 12 && hora < 18) {
        return '☀️ Buenas tardes';
    } else {
        return '🌙 Buenas noches';
    }
}

// ==========================================
// FUNCIÓN: FORMATEAR HORA PARA MOSTRAR
// ==========================================

/**
 * Formatea la hora según el modo seleccionado (24h o 12h)
 * Modo 24h: Muestra la hora directamente (HH:MM:SS)
 * Modo 12h: Convierte a formato 12h con AM/PM
 * @param {number} horas - Horas (0-23)
 * @param {number} minutos - Minutos (0-59)
 * @param {number} segundos - Segundos (0-59)
 * @returns {string} Hora formateada
 */
function formatearHora(horas, minutos, segundos) {
    if (formatoHora24) {
        // Formato 24 horas: HH:MM:SS
        return `${formatearNumero(horas)}:${formatearNumero(minutos)}:${formatearNumero(segundos)}`;
    } else {
        // Formato 12 horas: HH:MM:SS AM/PM
        const periodo = horas >= 12 ? 'PM' : 'AM';
        const horas12 = horas % 12 === 0 ? 12 : horas % 12;
        return `${formatearNumero(horas12)}:${formatearNumero(minutos)}:${formatearNumero(segundos)} ${periodo}`;
    }
}

// ==========================================
// FUNCIÓN: ACTUALIZAR RELOJ
// ==========================================

/**
 * Actualiza el reloj digital cada segundo
 * - Obtiene la hora actual
 * - Formatea la hora y fecha
 * - Actualiza el saludo según la hora del día
 * - Comprueba si debe sonar la alarma
 */
function actualizarReloj() {
    // Obtener fecha y hora actual
    const ahora = new Date();
    const horas = ahora.getHours();
    const minutos = ahora.getMinutes();
    const segundos = ahora.getSeconds();

    // Actualizar display del reloj
    relojElemento.textContent = formatearHora(horas, minutos, segundos);

    // Actualizar saludo según la hora
    saludoElemento.textContent = obtenerSaludo(horas);

    // Actualizar fecha con formato español
    const diaSemana = dias[ahora.getDay()];
    const diaDelMes = formatearNumero(ahora.getDate());
    const mes = meses[ahora.getMonth()];
    const año = ahora.getFullYear();
    
    fechaElemento.textContent = `${diaSemana}, ${diaDelMes} de ${mes} de ${año}`;

    // Verificar si debe sonar la alarma
    verificarAlarma(horas, minutos);
}

// ==========================================
// FUNCIÓN: VERIFICAR SI LA ALARMA DEBE SONAR
// ==========================================

/**
 * Compara la hora actual con la alarma configurada
 * Si coinciden y la alarma está activa, dispara la alarma
 * Utiliza alarmaYaSonó para evitar que suene múltiples veces
 * @param {number} horas - Hora actual
 * @param {number} minutos - Minuto actual
 */
function verificarAlarma(horas, minutos) {
    // Solo verificar si hay alarma activa
    if (!alarmaActiva || !horaAlarmaConfigurada) {
        return;
    }

    // Obtener hora y minuto de la alarma configurada
    const [horaAlarmaCfg, minutoAlarmaCfg] = horaAlarmaConfigurada.split(':').map(Number);

    // Comparar: si la hora y minuto actual coinciden con la alarma configurada
    if (horas === horaAlarmaCfg && minutos === minutoAlarmaCfg && !alarmaYaSonó) {
        // Disparar la alarma
        dispararAlarma();
        alarmaYaSonó = true; // Evitar que suene nuevamente en el mismo minuto
    }

    // Resetear la bandera si ya pasó el minuto de la alarma
    if (horas !== horaAlarmaCfg || minutos !== minutoAlarmaCfg) {
        alarmaYaSonó = false;
    }
}

// ==========================================
// FUNCIÓN: DISPARAR ALARMA
// ==========================================

/**
 * Dispara la alarma cuando llega la hora configurada
 * - Muestra notificación visual
 * - Reproduce sonido (simulado con alert)
 * - Anima la pantalla
 * - Desactiva automáticamente la alarma después de sonar
 */
function dispararAlarma() {
    // Mostrar notificación visual
    notificacionAlarma.classList.add('activa');

    // Reproducir sonido (usando alert como simulación)
    // En una aplicación real, usarías el API Web Audio
    reproducirSonidoAlarma();

    // Agregar animación de vibración al contenedor principal
    document.querySelector('.contenedor-principal').style.animation = 'vibrar 0.2s infinite';

    // Después de 5 segundos, dejar de reproducir sonido
    setTimeout(() => {
        document.querySelector('.contenedor-principal').style.animation = 'none';
    }, 5000);
}

// ==========================================
// FUNCIÓN: REPRODUCIR SONIDO DE ALARMA
// ==========================================

/**
 * Simula el sonido de la alarma
 * Utiliza el API Web Audio para generar un sonido
 * o usa alert como fallback si no está disponible
 */
function reproducirSonidoAlarma() {
    try {
        // Intentar usar Web Audio API para generar sonido
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscilador = audioContext.createOscillator();
        const ganancia = audioContext.createGain();

        oscilador.connect(ganancia);
        ganancia.connect(audioContext.destination);

        // Configurar frecuencia del sonido (880 Hz - nota A5)
        oscilador.frequency.value = 880;
        
        // Configurar volumen
        ganancia.gain.setValueAtTime(0.3, audioContext.currentTime);

        // Iniciar y detener el sonido
        oscilador.start(audioContext.currentTime);
        oscilador.stop(audioContext.currentTime + 2);

        // Repetir el sonido varias veces
        for (let i = 1; i < 3; i++) {
            const osc = audioContext.createOscillator();
            const gan = audioContext.createGain();
            osc.connect(gan);
            gan.connect(audioContext.destination);
            osc.frequency.value = 880;
            gan.gain.setValueAtTime(0.3, audioContext.currentTime + i * 2.5);
            osc.start(audioContext.currentTime + i * 2.5);
            osc.stop(audioContext.currentTime + i * 2.5 + 2);
        }
    } catch (error) {
        // Si Web Audio API no está disponible, mostrar alert
        console.log('Sonido de alarma activado');
    }
}

// ==========================================
// FUNCIÓN: ESTABLECER ALARMA
// ==========================================

/**
 * Establece una nueva alarma basada en la entrada del usuario
 * - Valida que la hora sea futura
 * - Almacena la hora de la alarma
 * - Actualiza la interfaz gráfica
 * - Habilita/deshabilita botones según sea necesario
 */
function establecerAlarma() {
    const horaSeleccionada = inputHoraAlarma.value;

    // Validar que se haya seleccionado una hora
    if (!horaSeleccionada) {
        alert('Por favor selecciona una hora');
        return;
    }

    // Obtener la hora actual
    const ahora = new Date();
    const horaActualFormato = `${formatearNumero(ahora.getHours())}:${formatearNumero(ahora.getMinutes())}`;

    // Validar que la hora sea futura (o se permita hoy si es más tarde)
    if (horaSeleccionada <= horaActualFormato) {
        alert('Por favor selecciona una hora futura. Si deseas alarma para mañana, configura una hora posterior a la actual.');
        return;
    }

    // Activar alarma
    alarmaActiva = true;
    horaAlarmaConfigurada = horaSeleccionada;
    alarmaYaSonó = false;

    // Actualizar interfaz
    estadoAlarma.textContent = 'Alarma Activa ✓';
    estadoAlarma.classList.remove('estado-inactivo');
    estadoAlarma.classList.add('estado-activo');

    textoHoraAlarma.textContent = `Alarma configurada para las ${horaSeleccionada}`;

    // Actualizar botones
    btnEstablecerAlarma.disabled = true;
    btnCancelarAlarma.disabled = false;

    // Mostrar indicador visual
    indicadorActivoVisual.classList.add('visible');

    // Mensaje de confirmación
    alert(`✓ Alarma establecida para las ${horaSeleccionada}`);
}

// ==========================================
// FUNCIÓN: CANCELAR ALARMA
// ==========================================

/**
 * Cancela la alarma activa
 * - Desactiva la alarma
 * - Limpia la hora configurada
 * - Actualiza la interfaz gráfica
 * - Restaura los botones a su estado inicial
 */
function cancelarAlarma() {
    // Desactivar alarma
    alarmaActiva = false;
    horaAlarmaConfigurada = null;
    alarmaYaSonó = false;

    // Actualizar interfaz
    estadoAlarma.textContent = 'Alarma Inactiva';
    estadoAlarma.classList.remove('estado-activo');
    estadoAlarma.classList.add('estado-inactivo');

    textoHoraAlarma.textContent = '';

    // Actualizar botones
    btnEstablecerAlarma.disabled = false;
    btnCancelarAlarma.disabled = true;

    // Ocultar indicador visual
    indicadorActivoVisual.classList.remove('visible');

    // Mensaje de confirmación
    alert('✓ Alarma cancelada');
}

// ==========================================
// FUNCIÓN: ACEPTAR ALARMA (CERRAR NOTIFICACIÓN)
// ==========================================

/**
 * Cierra la notificación de alarma cuando el usuario hace clic en "Aceptar"
 * - Oculta la notificación
 * - Cancela la alarma automáticamente
 */
function aceptarAlarma() {
    notificacionAlarma.classList.remove('activa');
    cancelarAlarma();
}

// ==========================================
// FUNCIÓN: ALTERNAR FORMATO DE HORA
// ==========================================

/**
 * Cambia entre formato 24 horas y 12 horas (AM/PM)
 * Actualiza el botón para mostrar el formato actual
 */
function alternarFormato() {
    formatoHora24 = !formatoHora24;
    toggleFormato.textContent = formatoHora24 ? '24h' : '12h';
}

// ==========================================
// EVENT LISTENERS - INICIALIZAR EVENTOS
// ==========================================

// Botón para establecer alarma
btnEstablecerAlarma.addEventListener('click', establecerAlarma);

// Botón para cancelar alarma
btnCancelarAlarma.addEventListener('click', cancelarAlarma);

// Botón para aceptar alarma
btnAceptarAlarma.addEventListener('click', aceptarAlarma);

// Botón para alternar formato de hora
toggleFormato.addEventListener('click', alternarFormato);

// Permitir establecer alarma presionando Enter en el input
inputHoraAlarma.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        establecerAlarma();
    }
});

// ==========================================
// INICIALIZACIÓN
// ==========================================

/**
 * Inicializa la aplicación:
 * - Actualiza el reloj inmediatamente
 * - Configura setInterval para actualizar cada segundo
 */
function inicializar() {
    // Actualizar reloj inmediatamente
    actualizarReloj();

    // Actualizar reloj cada segundo (1000 ms)
    setInterval(actualizarReloj, 1000);

    // El botón de cancelar comienza deshabilitado (no hay alarma inicial)
    btnCancelarAlarma.disabled = true;
}

// Ejecutar inicialización cuando se carga el DOM
inicializar();
