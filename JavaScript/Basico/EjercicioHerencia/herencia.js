class Persona{
    static contadorPersonas = 0;

    constructor(nombre, apellido, edad){
        Persona.contadorPersonas++;
        this._idPersona = Persona.contadorPersonas;
        this._nombre = nombre;
        this._apellido = apellido;
        this._edad = edad;
    }

    get IdPersona(){
        return this._idPersona;
    }

    get Nombre(){
        return this._nombre;
    }

    set Nombre(nombre){
        this._nombre = nombre;
    }

    get Apellido(){
        return this._apellido;
    }

    set Apellido(apellido){
        this._apellido = apellido;
    }

    get Edad(){
        return this._edad;
    }

    set Edad(edad){
        this._edad = edad;
    }

    toString(){
        return this._nombre + " " + this._apellido + " " + this._edad + " años";
    }
}

class Empleado extends Persona{
    static contadorEmpleados = 0;

    constructor(nombre, apellido, edad, sueldo){
        super(nombre, apellido, edad);
        Empleado.contadorEmpleados++;
        this._idEmpleado = Empleado.contadorEmpleados;
        this._sueldo = sueldo;
    }

    get IdEmpleado(){
        return this._idEmpleado;
    }

    get Sueldo(){
        return this._sueldo;
    }

    set Sueldo(sueldo){
        this._sueldo = sueldo;
    }

    toString(){
        return super.toString() + ". Salario: " + this._sueldo
    }
}

class Cliente extends Persona{
    static contadorClientes = 0;

    constructor(nombre, apellido, edad){
        super(nombre, apellido, edad);
        Cliente.contadorClientes++;
        this._idCliente = Cliente.contadorClientes;
        this._fechaRegistro = new Date();
    }

    get IdCliente(){
        return this._idCliente;
    }

    get FechaRegistro(){
        return this._fechaRegistro;
    }

    set FechaRegistro(fechaRegistro){
        this._fechaRegistro = fechaRegistro;
    }

    toString(){
        return super.toString() + ". Registrado en: " + this._fechaRegistro
    }
}

let persona1 = new Persona("Rodrigo", "Peralta", 30)
console.log("Datos Persona: Id Persona: " + persona1.IdPersona);
console.log(persona1.toString());

let empleado1 = new Empleado("Nicolás", "García", 25, 1000);
console.log("Datos Empleado: Id Persona: " + empleado1.IdPersona);
console.log("Id Empleado: " + empleado1.IdEmpleado);
console.log(empleado1.toString());

let cliente1 = new Cliente("Ana", "Pérez", 18);
console.log("Datos Cliente: Id Persona: " + cliente1.IdPersona);
console.log("Id Cliente: " + cliente1.IdCliente);
console.log(cliente1.toString());