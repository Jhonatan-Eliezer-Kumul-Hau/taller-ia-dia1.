// 🖱️ Ejercicio: DOM (Document Object Model)

// 1. Seleccionar elementos
// Pídele a la IA: "¿Cómo selecciono un elemento por su ID en JavaScript?"
// Selecciona el botón 'nbtnCambiarColor' y la 'miCaja'.

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btnCambiarColor');
  const miCaja = document.getElementById('miCaja');

  if (!btn || !miCaja) return; // evita errores si no existen

  btn.addEventListener('click', () => {
    miCaja.style.backgroundColor = 'blue';
  });
});


// 2. Escuchar eventos (Clicks)
// Pídele a la IA: "¿Cómo hago que pase algo cuando hago click en un botón?"


// 3. Modificar elementos
// Cuando den click en 'Cambiar Color', cambia el color de fondo de la caja a rojo.
// Pídele a la IA: "¿Cómo cambio el estilo background-color de un elemento con JS?"


// Reto:
// Haz que el botón 'Cambiar Texto' cambie lo que dice dentro de la caja por "¡Hola DOM!".

