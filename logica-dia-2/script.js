//ejercicios Array y Objetos
//crea una lista de tus tres comidas favoritas
var comidasFavoritas = ["Pizza", "Sushi", "Tacos"];
//2. objeto (hey y volve)
var persona = {
    nombre: "Juan",
    edad: 30,
    ciudad: "Madrid",
    habilidades: ["programación", "dibujo", "ciclismo"],
    estatura : 1.75,
    programador: true
};

//como accedo a la propirdad nombre de mi objeto persona
console.log('Nombre:' + persona.nombre);
//como accedo a la propirdad habilidades de mi objeto persona
console.log('Habilidades:' + persona.habilidades);
//como accedo a la habilidad de dibujo de mi objeto persona
console.log('Habilidad de dibujo:' + persona.habilidades[1]);

//3. array de objetos
// crea una lista de 3 alumnos (objetos) con nombre y calificacion
var alumnos = [
    {nombre: "Ana", calificacion: 85},  
    {nombre: "Luis", calificacion: 92},  
    {nombre: "Marta", calificacion: 78}  
];
//escribe un bucle que recorra el array de alumnos e imprima solo los que tengan calificacion mayor a 80
for (var i = 0; i < alumnos.length; i++) {
    if (alumnos[i].calificacion > 80) {
        console.log('Alumno aprobado: ' + alumnos[i].nombre + ' con calificación ' + alumnos[i].calificacion);
    }
}
