//ejercicios: detector de palíndromos 
//objetivo: crea una logica compleja ensapsulada en una funcion
//un ejemplo de palíndromo es "anilina" o reconocer, oso
//1. crea una funcion llamada esPalindromo que reciba un texto y retorne true si es un palindromo y false si no lo es

/**
 * Verifica si una cadena de texto es un palíndromo.
 * 
 * Un palíndromo es una palabra, frase o número que se lee igual 
 * en ambas direcciones (hacia adelante y hacia atrás).
 * 
 * La función elimina espacios en blanco y convierte el texto a minúsculas
 * antes de realizar la comparación, permitiendo verificar palíndromos
 * que contienen espacios o mayúsculas.
 * 
 * @param {string} texto - La cadena de texto a verificar
 * @returns {boolean} true si el texto es un palíndromo, false en caso contrario
 * 
 * @example
 * esPalindromo("Anita lava la tina"); // true
 * esPalindromo("Hola"); // false
 * esPalindromo("radar"); // true
 */
function esPalindromo(texto) {
    //elimina espacios y convierte a minusculas
    const textoLimpio = texto.replace(/\s+/g, '').toLowerCase();
    //invierte el texto usando for
    let textoInvertido = '';
    for (let i = textoLimpio.length - 1; i >= 0; i--) {
        textoInvertido += textoLimpio[i];
    }
    //compara el texto limpio con el texto invertido
    return textoLimpio === textoInvertido;
}
