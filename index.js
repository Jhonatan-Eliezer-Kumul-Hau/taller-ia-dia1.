// Escribe un programa que salude al usuario por consola
console.log("¡Hola, usuario!");

//"¿Qué es un commit y por qué es importante?"
// Un commit es una instantánea de los cambios realizados en el código fuente de un proyecto. Es una operación fundamental en sistemas de control de versiones como Git. Cada commit registra el estado del proyecto en un momento específico, junto con un mensaje descriptivo que explica los cambios realizados.

//"¿Cuál es la diferencia entre git add y git commit?"
// git add es el comando que se utiliza para agregar cambios específicos al área de preparación (staging area) antes de hacer un commit. Permite seleccionar qué archivos o partes de archivos se incluirán en el próximo commit.

//"Explícame qué hace el comando git push."
// git push es el comando que se utiliza para enviar los commits locales a un repositorio remoto. Esto actualiza el repositorio remoto con los cambios realizados en el repositorio local, permitiendo que otros colaboradores accedan a las últimas modificaciones.

// Definimos una función llamada 'sum' que recibe dos parámetros: a y b
function sum(a, b) {
  // Convertimos 'a' a número por si se pasa como texto (por ejemplo "2")
  a = Number(a);
  // Convertimos 'b' a número por si se pasa como texto (por ejemplo "3")
  b = Number(b);
  // Si 'a' no es un número válido, Number(a) devuelve NaN; comprobamos eso
  if (isNaN(a)) {
    // Lanzamos un error simple para indicar entrada inválida
    throw new Error('El primer argumento no es un número válido');
  }
  // Comprobamos también 'b'
  if (isNaN(b)) {
    throw new Error('El segundo argumento no es un número válido');
  }
  // Devolvemos la suma de los dos números
  return a + b;
} // fin de la función 'sum'

// Ejemplo de uso:
// Llamamos a la función con dos números y mostramos el resultado por consola
console.log(sum(2, 3)); // Imprime 5

// Ejemplo con cadenas numéricas (también funciona porque convertimos con Number)
console.log(sum('4', '6')); // Imprime 10