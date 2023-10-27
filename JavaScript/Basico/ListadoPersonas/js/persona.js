class Persona{
    constructor(nombre, apellido){
        this._nombre = nombre;
        this._apellido = apellido;
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
}