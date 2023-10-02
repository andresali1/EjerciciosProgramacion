let suma = function (a: number, b: number) {
    return a + b;
}

console.log(suma(5, 8));

let sumaFlecha = (a: number, b: number) => a + b;

console.log(sumaFlecha(6, 3));

let obtenerNombre = function () {
    return "Pepe Pérez";
}

console.log(obtenerNombre());

let obtenerNombreFlecha = () => "Maria Gómez";

console.log(obtenerNombreFlecha());