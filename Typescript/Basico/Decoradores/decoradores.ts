function Saludar(target: Function): void {
    target.prototype.saludos = function():void{
        console.log("Hola desde decorador");
    }
}

//Será admitido en versiones más avanzadas de EcmaScript, en es5 genera un error
@Saludar
class Hola {
    constructor() { }
}

let hola1 = new Hola();
hola1.saludos();