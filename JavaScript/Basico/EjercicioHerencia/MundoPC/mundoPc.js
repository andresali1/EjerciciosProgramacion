class DispositivoEntrada {
  constructor(tipoEntrada, marca) {
    this._tipoEntrada = tipoEntrada;
    this._marca = marca;
  }

  get TipoEntrada() {
    return this._tipoEntrada;
  }

  set TipoEntrada(tipoEntrada) {
    this._tipoEntrada = tipoEntrada;
  }

  get Marca() {
    return this._marca;
  }

  set Marca(marca) {
    this._marca = marca;
  }
}

class Raton extends DispositivoEntrada {
  static contadorRatones = 0;

  constructor(tipoEntrada, marca) {
    super(tipoEntrada, marca);
    this._idRaton = ++Raton.contadorRatones;
  }

  toString() {
    return `Id: ${this._idRaton}. ${this._tipoEntrada} ${this._marca}`;
  }
}

class Teclado extends DispositivoEntrada {
  static contadorTeclados = 0;

  constructor(tipoEntrada, marca) {
    super(tipoEntrada, marca);
    this._idTeclado = ++Teclado.contadorTeclados;
  }

  toString() {
    return `Id: ${this._idTeclado}. ${this._tipoEntrada} ${this._marca}`;
  }
}

class Monitor {
  static contadorMonitores = 0;

  constructor(marca, tamanio) {
    this._idMonitor = ++Monitor.contadorMonitores;
    this._marca = marca;
    this._tamanio = tamanio;
  }

  get IdMonitor() {
    return this._idMonitor;
  }

  get Marca() {
    return this._marca;
  }

  set Marca(marca) {
    this._marca = marca;
  }

  get Tamanio() {
    return this._tamanio;
  }

  set Tamanio(tamanio) {
    this._tamanio = tamanio;
  }

  toString() {
    return `Id: ${this._idMonitor}. ${this._marca} ${this._tamanio}`;
  }
}

class Computadora {
  static contadorComputadoras = 0;

  constructor(nombre, monitor, teclado, raton) {
    this._idComputadora = ++Computadora.contadorComputadoras;
    this._nombre = nombre;
    this._monitor = monitor;
    this._teclado = teclado;
    this._raton = raton;
  }

  get IdComputadora() {
    return this._idComputadora;
  }

  get Nombre() {
    return this._nombre;
  }

  set Nombre(nombre) {
    this._nombre = nombre;
  }

  get Monitor(){
    return this._monitor.toString();
  }

  set Monitor(monitor){
    this._monitor = monitor;
  }

  get Teclado(){
    return this._teclado.toString();
  }

  set Teclado(teclado){
    this._teclado = teclado;
  }

  get Raton(){
    return this._raton.toString();
  }

  set Raton(raton){
    this._raton = raton;
  }

  toString(){
    return `Id: ${this._idComputadora}. Nombre: ${this._nombre}, Componentes: \n${this._monitor.toString()}\n${this._teclado.toString()}\n${this._raton.toString()}`;
  }
}

class Orden{
    static contadorOrdenes = 0;

    constructor(){
        this._idOrden = ++Orden.contadorOrdenes;
        this._computadoras = [];
    }

    get IdOrden(){
        return this._idOrden;
    }

    agregarComputadora(computadora){
        this._computadoras.push(computadora);
    }

    mostrarOrden(){
        let computadorasOrden = "";
        for(let computadora of this._computadoras){
            computadorasOrden += `\n${computadora.toString()}`;
        }
        return computadorasOrden;
    }

    toString(){
        return `Orden: ${this._idOrden}, Computadoras: ${this.mostrarOrden()}`;
    }
}

let computadora1 = new Computadora("Lenovo", new Monitor("Kasuki", 22), new Teclado("USB", "Redragon"), new Raton("USB", "Logi"));
let computadora2 = new Computadora("HP", new Monitor("Samsung", 24), new Teclado("USB", "Logitech"), new Raton("USB", "Logitech"));

let orden1 = new Orden();
orden1.agregarComputadora(computadora1);
orden1.agregarComputadora(computadora2);

console.log(orden1.toString());