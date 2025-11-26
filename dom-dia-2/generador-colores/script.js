// =========================================
// GENERADOR DE COLORES ALEATORIOS
// JavaScript Vanilla sin dependencias
// =========================================

// Seleccionar elementos del DOM
const colorDisplay = document.getElementById('colorDisplay');
const colorCode = document.getElementById('colorCode');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const copyMessage = document.getElementById('copyMessage');

// Variable para almacenar el color actual
let currentColor = '#FFFFFF';

// =========================================
// FUNCIÓN: Generar un color hexadecimal aleatorio
// =========================================
/**
 * Genera un color hexadecimal aleatorio en formato #RRGGBB
 * @returns {string} Código hexadecimal del color (ej: #A3C2F1)
 */
function generateRandomColor() {
    // Generar 3 números aleatorios entre 0 y 255 para RGB
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    
    // Convertir a hexadecimal y rellenar con ceros si es necesario
    const hex = '#' + 
        r.toString(16).padStart(2, '0').toUpperCase() +
        g.toString(16).padStart(2, '0').toUpperCase() +
        b.toString(16).padStart(2, '0').toUpperCase();
    
    return hex;
}

// =========================================
// FUNCIÓN: Actualizar el color mostrado
// =========================================
/**
 * Actualiza el color del display, el código hexadecimal y el color actual
 * Incluye transiciones suaves
 */
function updateColor() {
    // Generar nuevo color aleatorio
    currentColor = generateRandomColor();
    
    // Actualizar fondo del div con transición suave
    colorDisplay.style.backgroundColor = currentColor;
    
    // Actualizar el texto con el código hexadecimal
    colorCode.textContent = currentColor;
    
    // Log en consola para debugging
    console.log('Nuevo color generado:', currentColor);
}

// =========================================
// FUNCIÓN: Copiar color al portapapeles
// =========================================
/**
 * Copia el código hexadecimal actual al portapapeles
 * Muestra un mensaje de confirmación visual
 */
function copyToClipboard() {
    // Usar API Clipboard para copiar el texto
    navigator.clipboard.writeText(currentColor)
        .then(() => {
            // Si la copia es exitosa, mostrar mensaje de confirmación
            showCopyMessage();
            console.log('Color copiado al portapapeles:', currentColor);
        })
        .catch((err) => {
            // Método alternativo para navegadores antiguos
            console.warn('Clipboard API no disponible, usando método alternativo');
            copyToClipboardFallback();
        });
}

// =========================================
// FUNCIÓN: Método alternativo para copiar
// =========================================
/**
 * Método alternativo para copiar al portapapeles
 * Se usa en navegadores que no soportan Clipboard API
 */
function copyToClipboardFallback() {
    // Crear un elemento textarea temporal
    const textarea = document.createElement('textarea');
    textarea.value = currentColor;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    
    // Agregar al DOM y seleccionar
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        // Ejecutar comando de copia
        document.execCommand('copy');
        showCopyMessage();
        console.log('Color copiado (método alternativo):', currentColor);
    } catch (err) {
        console.error('Error al copiar:', err);
    }
    
    // Remover elemento temporal
    document.body.removeChild(textarea);
}

// =========================================
// FUNCIÓN: Mostrar mensaje de confirmación
// =========================================
/**
 * Muestra un mensaje visual de confirmación
 * El mensaje desaparece automáticamente después de 2 segundos
 */
function showCopyMessage() {
    // Establecer el texto del mensaje
    copyMessage.textContent = '✓ ¡Copiado!';
    
    // Agregar clase para activar la animación
    copyMessage.classList.add('show');
    
    // Remover el mensaje después de 2 segundos
    setTimeout(() => {
        copyMessage.classList.remove('show');
    }, 2000);
}

// =========================================
// EVENT LISTENERS: Asignar eventos a botones
// =========================================

// Evento para generar color al hacer clic en el botón "Generar Color"
generateBtn.addEventListener('click', updateColor);

// Evento para copiar al portapapeles al hacer clic en el botón "Copiar"
copyBtn.addEventListener('click', copyToClipboard);

// =========================================
// INICIALIZACIÓN
// =========================================

// Generar un color aleatorio al cargar la página
updateColor();

console.log('Generador de Colores cargado correctamente');
