//crea una funcion que calcule el area de un circulo dado su radio 
/**
 * Calcula el área de un círculo dado su radio.
 * @param {number} radio - El radio del círculo.
 * @returns {number} El área del círculo.
 */
function areaCirculo(radio) {
    return Math.PI * radio * radio;
}

console.log(areaCirculo(5));

//--------------------------------------------------------------------------------//

//crea una funcion para calcular el area de un rectangulo dados su base y altura
/**
 * Calcula el área de un rectángulo dados su base y altura.
 * @param {number} base - La base del rectángulo.
 * @param {number} altura - La altura del rectángulo.
 * @returns {number} El área del rectángulo.
 */
function areaRectangulo(base, altura) {
    return base * altura;
}

console.log(areaRectangulo(5, 10));

//--------------------------------------------------------------------------------//

//vamos a calcular el volumen de un cilindro 
//el volumen es el area de la base (circulo) por la altura
/**
 * Calcula el volumen de un cilindro dados su radio y altura.
 * El volumen se calcula como el área de la base (un círculo) multiplicada por la altura.
 * @param {number} radio - El radio de la base del cilindro.
 * @param {number} altura - La altura del cilindro.
 * @returns {number} El volumen del cilindro.
 * @example
 * // Calcula el volumen de un cilindro con radio 3 y altura 5
 * volumenCilindro(3, 5); // Devuelve aproximadamente 141.37
 */
function volumenCilindro(radio, altura) {
    return areaCirculo(radio) * altura;
}

console.log(volumenCilindro(5, 10));

//--------------------------------------------------------------------------------//

//crea una funcion para calcular una derivada 
//simple de una funcion polinomial de la forma ax^n
/**
 * Calcula la derivada simple de una función polinomial de la forma ax^n.
 * @param {number} a - El coeficiente de la variable x.
 * @param {number} n - El exponente de la variable x.
 * @returns {number} La derivada simple de la función polinomial.
 */
function derivadaPolinomial(a, n) {
    return a * n * Math.pow(x, n - 1);
}

console.log(derivadaPolinomial(5, 2));

//--------------------------------------------------------------------------------//

//crea una funcion para calcular una integral simple de una funcion polinomial de la forma ax^n
/**
 * Calcula la integral simple de una función polinomial de la forma ax^n.
 * @param {number} a - El coeficiente de la variable x.
 * @param {number} n - El exponente de la variable x.
 * @returns {number} La integral simple de la función polinomial.
 */
function integralPolinomial(a, n) {
    return a / (n + 1) * Math.pow(x, n + 1);
}

console.log(integralPolinomial(5, 2));      