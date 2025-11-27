// ==========================================
// ANALIZADOR DE TEXTO - JavaScript
// ==========================================

// ==========================================
// ELEMENTOS DEL DOM
// ==========================================

// Input principal
const textInput = document.getElementById('textInput');

// Elementos para mostrar estadísticas
const caracteresTotales = document.getElementById('caracteresTotales');
const caracteresSinEspacios = document.getElementById('caracteresSinEspacios');
const numeroPalabras = document.getElementById('numeroPalabras');
const numeroOraciones = document.getElementById('numeroOraciones');
const tiempoLectura = document.getElementById('tiempoLectura');
const densidadLeXica = document.getElementById('densidadLeXica');

// Botones
const btnCopiarEstadisticas = document.getElementById('btnCopiarEstadisticas');
const btnLimpiar = document.getElementById('btnLimpiar');

// Mensaje de confirmación
const mensajeConfirmacion = document.getElementById('mensajeConfirmacion');

// Contador visual
const contadorVisual = document.getElementById('contadorVisual');

// ==========================================
// CONSTANTES
// ==========================================

// Velocidad de lectura promedio (palabras por minuto)
const VELOCIDAD_LECTURA = 200;

// ==========================================
// FUNCIÓN: CONTAR CARACTERES CON ESPACIOS
// ==========================================

/**
 * Cuenta el número total de caracteres incluyendo espacios
 * @param {string} texto - Texto a analizar
 * @returns {number} Número total de caracteres
 */
function contarCaracteresTotales(texto) {
    // Retorna la longitud del texto completo
    return texto.length;
}

// ==========================================
// FUNCIÓN: CONTAR CARACTERES SIN ESPACIOS
// ==========================================

/**
 * Cuenta el número de caracteres excluyendo espacios, saltos de línea y tabulaciones
 * @param {string} texto - Texto a analizar
 * @returns {number} Número de caracteres sin espacios
 */
function contarCaracteresSinEspacios(texto) {
    // Elimina todos los espacios en blanco (espacios, tabulaciones, saltos de línea)
    // usando expresión regular y retorna la longitud
    return texto.replace(/\s/g, '').length;
}

// ==========================================
// FUNCIÓN: CONTAR PALABRAS
// ==========================================

/**
 * Cuenta el número de palabras en el texto
 * Considera múltiples espacios consecutivos como un solo separador
 * @param {string} texto - Texto a analizar
 * @returns {number} Número de palabras
 */
function contarPalabras(texto) {
    // Elimina espacios en blanco al inicio y final
    const textoLimpio = texto.trim();

    // Si el texto está vacío, retorna 0
    if (textoLimpio.length === 0) {
        return 0;
    }

    // Divide el texto por espacios en blanco múltiples (regex: \s+)
    // Esto considera espacios, tabulaciones y saltos de línea como separadores
    const palabras = textoLimpio.split(/\s+/);

    // Retorna el número de palabras
    return palabras.length;
}

// ==========================================
// FUNCIÓN: CONTAR ORACIONES
// ==========================================

/**
 * Cuenta el número de oraciones en el texto
 * Una oración se considera terminada por: . ! o ?
 * @param {string} texto - Texto a analizar
 * @returns {number} Número de oraciones
 */
function contarOraciones(texto) {
    // Elimina espacios al inicio y final
    const textoLimpio = texto.trim();

    // Si el texto está vacío, retorna 0
    if (textoLimpio.length === 0) {
        return 0;
    }

    // Busca todos los caracteres que terminan una oración: . ! ?
    // Usa expresión regular para encontrar estos caracteres
    const oraciones = textoLimpio.match(/[.!?]/g);

    // Si no hay puntuación, retorna 0
    // Si hay puntuación, retorna el número de coincidencias
    return oraciones ? oraciones.length : 0;
}

// ==========================================
// FUNCIÓN: CALCULAR TIEMPO DE LECTURA
// ==========================================

/**
 * Calcula el tiempo estimado de lectura basado en palabras/minuto
 * Utiliza una velocidad promedio de 200 palabras por minuto
 * @param {number} palabras - Número de palabras
 * @returns {string} Tiempo formateado (minutos y segundos)
 */
function calcularTiempoLectura(palabras) {
    // Si hay 0 palabras, retorna "0 seg"
    if (palabras === 0) {
        return '0 seg';
    }

    // Calcula minutos: palabras / velocidad de lectura
    const minutos = Math.floor(palabras / VELOCIDAD_LECTURA);

    // Calcula segundos restantes
    // (palabras % VELOCIDAD_LECTURA) da el resto
    // Se multiplica por 60 para convertir a segundos
    const segundos = Math.round((palabras % VELOCIDAD_LECTURA / VELOCIDAD_LECTURA) * 60);

    // Si hay minutos y segundos, formatea como "X min Y seg"
    if (minutos > 0) {
        return `${minutos} min ${segundos} seg`;
    }

    // Si solo hay segundos, formatea como "Y seg"
    return `${segundos} seg`;
}

// ==========================================
// FUNCIÓN: CALCULAR DENSIDAD LÉXICA
// ==========================================

/**
 * Calcula la densidad léxica: promedio de caracteres por palabra
 * Fórmula: (caracteres sin espacios / palabras) * 100
 * @param {number} caracteres - Número de caracteres sin espacios
 * @param {number} palabras - Número de palabras
 * @returns {string} Densidad formateada como porcentaje
 */
function calcularDensidad(caracteres, palabras) {
    // Si no hay palabras, retorna "0%"
    if (palabras === 0) {
        return '0%';
    }

    // Calcula el promedio de caracteres por palabra
    // Multiplica por 100 para obtener un valor más legible
    const densidad = (caracteres / palabras);

    // Retorna redondeado a 1 decimal con símbolo de porcentaje
    return `${Math.round(densidad * 10) / 10}`;
}

// ==========================================
// FUNCIÓN: VALIDAR TEXTO
// ==========================================

/**
 * Valida que el texto no esté vacío
 * @param {string} texto - Texto a validar
 * @returns {boolean} true si el texto es válido, false si está vacío
 */
function validarTexto(texto) {
    // Retorna true si después de trimear hay contenido
    return texto.trim().length > 0;
}

// ==========================================
// FUNCIÓN: ACTUALIZAR ESTADÍSTICAS
// ==========================================

/**
 * Actualiza todas las estadísticas en tiempo real
 * Se ejecuta en cada evento de entrada del usuario
 * Incluye validación de texto vacío
 */
function actualizarEstadisticas() {
    try {
        // Obtener el texto actual del textarea
        const texto = textInput.value;

        // Validar que el texto no esté vacío
        if (!validarTexto(texto)) {
            // Si el texto está vacío, establecer todas las estadísticas a 0
            caracteresTotales.textContent = '0';
            caracteresSinEspacios.textContent = '0';
            numeroPalabras.textContent = '0';
            numeroOraciones.textContent = '0';
            tiempoLectura.textContent = '0 seg';
            densidadLeXica.textContent = '0%';
            contadorVisual.textContent = '0 caracteres';
            return; // Salir de la función
        }

        // Calcular todas las estadísticas
        const totales = contarCaracteresTotales(texto);
        const sinEspacios = contarCaracteresSinEspacios(texto);
        const palabras = contarPalabras(texto);
        const oraciones = contarOraciones(texto);
        const tiempo = calcularTiempoLectura(palabras);
        const densidad = calcularDensidad(sinEspacios, palabras);

        // Actualizar elementos del DOM con las nuevas estadísticas
        caracteresTotales.textContent = totales;
        caracteresSinEspacios.textContent = sinEspacios;
        numeroPalabras.textContent = palabras;
        numeroOraciones.textContent = oraciones;
        tiempoLectura.textContent = tiempo;
        densidadLeXica.textContent = densidad;

        // Actualizar contador visual
        const textoContador = totales === 1 ? 'carácter' : 'caracteres';
        contadorVisual.textContent = `${totales} ${textoContador}`;

    } catch (error) {
        // Manejo de errores básico
        console.error('Error al actualizar estadísticas:', error);
        alert('Ocurrió un error al analizar el texto. Por favor, intenta de nuevo.');
    }
}

// ==========================================
// FUNCIÓN: GENERAR TEXTO DE ESTADÍSTICAS
// ==========================================

/**
 * Genera un texto formateado con todas las estadísticas
 * para copiar al portapapeles
 * @returns {string} Texto formateado con todas las estadísticas
 */
function generarTextoEstadisticas() {
    // Obtener los valores actuales de las estadísticas
    const texto = `
📊 ESTADÍSTICAS DEL TEXTO
═══════════════════════════════════════

📍 Caracteres Totales: ${caracteresTotales.textContent}
✏️  Caracteres Útiles: ${caracteresSinEspacios.textContent}
🔤 Palabras: ${numeroPalabras.textContent}
⭐ Oraciones: ${numeroOraciones.textContent}
⏱️  Tiempo de Lectura: ${tiempoLectura.textContent}
🎯 Densidad Léxica: ${densidadLeXica.textContent}

═══════════════════════════════════════
Generado: ${new Date().toLocaleString('es-ES')}
    `.trim();

    return texto;
}

// ==========================================
// FUNCIÓN: COPIAR ESTADÍSTICAS AL PORTAPAPELES
// ==========================================

/**
 * Copia las estadísticas formateadas al portapapeles del usuario
 * Muestra un mensaje de confirmación después
 */
function copiarEstadisticas() {
    try {
        // Generar texto de estadísticas
        const textoAcopiar = generarTextoEstadisticas();

        // Utilizar la API Clipboard para copiar al portapapeles
        navigator.clipboard.writeText(textoAcopiar).then(() => {
            // Si la copia fue exitosa, mostrar mensaje de confirmación
            mensajeConfirmacion.classList.add('mostrar');

            // Remover la clase después de 3 segundos
            setTimeout(() => {
                mensajeConfirmacion.classList.remove('mostrar');
            }, 3000);

        }).catch((error) => {
            // Si la API Clipboard no está disponible o hay error
            console.error('Error al copiar:', error);
            alert('Estadísticas:\n\n' + textoAcopiar);
        });

    } catch (error) {
        // Manejo de errores
        console.error('Error al copiar estadísticas:', error);
        alert('No se pudieron copiar las estadísticas. Por favor, intenta de nuevo.');
    }
}

// ==========================================
// FUNCIÓN: LIMPIAR TODO
// ==========================================

/**
 * Limpia el textarea y resetea todas las estadísticas
 * Pide confirmación al usuario antes de limpiar
 */
function limpiarTodo() {
    // Pedir confirmación al usuario
    const confirmacion = confirm('¿Estás seguro de que deseas limpiar todo el texto y las estadísticas?');

    if (confirmacion) {
        // Si el usuario confirma, limpiar el textarea
        textInput.value = '';

        // Resetear todas las estadísticas a 0
        caracteresTotales.textContent = '0';
        caracteresSinEspacios.textContent = '0';
        numeroPalabras.textContent = '0';
        numeroOraciones.textContent = '0';
        tiempoLectura.textContent = '0 seg';
        densidadLeXica.textContent = '0%';
        contadorVisual.textContent = '0 caracteres';

        // Enfocar el textarea para que el usuario pueda empezar a escribir
        textInput.focus();
    }
}

// ==========================================
// EVENT LISTENERS - INICIALIZAR EVENTOS
// ==========================================

// Evento para actualizar estadísticas mientras el usuario escribe
textInput.addEventListener('input', actualizarEstadisticas);

// Evento para actualizar al pegar texto
textInput.addEventListener('paste', () => {
    // Usar setTimeout para permitir que el paste se complete
    setTimeout(actualizarEstadisticas, 10);
});

// Botón para copiar estadísticas
btnCopiarEstadisticas.addEventListener('click', copiarEstadisticas);

// Botón para limpiar todo
btnLimpiar.addEventListener('click', limpiarTodo);

// ==========================================
// INICIALIZACIÓN
// ==========================================

/**
 * Inicializa la aplicación cuando se carga la página
 */
function inicializar() {
    // Enfocar el textarea al cargar
    textInput.focus();

    // Llamar una vez a actualizarEstadisticas para mostrar los valores iniciales
    actualizarEstadisticas();

    // Log en consola para verificar que la aplicación está lista
    console.log('✓ Analizador de texto cargado correctamente');
}

// Ejecutar la inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializar);
