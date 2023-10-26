class Producto {
  static contadorProductos = 0;

  constructor(nombre, precio) {
    this._idProducto = ++Producto.contadorProductos;
    this._nombre = nombre;
    this._precio = precio;
  }

  get IdProducto() {
    return this._idProducto;
  }

  get Nombre() {
    return this._nombre;
  }

  set Nombre(nombre) {
    this._nombre = nombre;
  }

  get Precio() {
    return this._precio;
  }

  set Precio(precio) {
    this._precio = precio;
  }

  toString() {
    return `Producto: ${this._idProducto}. ${this._nombre}, valor: ${this._precio}`;
  }
}

class Orden {
  static contadorOrdenes = 0;

  static get MAX_PRODUCTOS() {
    return 5;
  }

  constructor() {
    this._idOrden = ++Orden.contadorOrdenes;
    this._productos = [];
    this._contadorProductosAgregados = 0;
  }

  get IdOrden() {
    return this._idOrden;
  }

  agregarProducto(producto) {
    if (this._contadorProductosAgregados < Orden.MAX_PRODUCTOS) {
      this._productos.push(producto);
      this._contadorProductosAgregados++;
    } else {
      console.log("No se pueden agregar más productos");
    }
  }

  calcularTotal(){
    let totalVenta = 0;
    for(let producto of this._productos){
        totalVenta += producto.Precio;
    }

    return totalVenta;
  }

  mostrarOrden(){
    let productosOrden = "";
    for(let producto of this._productos){
        productosOrden += `\n ${producto.toString()}`;
    }

    console.log(`Orden: ${this._idOrden} Total: ${this.calcularTotal()}, Productos: ${productosOrden}`);
  }
}

let producto1 = new Producto("papas", 1900);
let producto2 = new Producto("doritos", 2200);
let producto3 = new Producto("cocacola", 2100);
let producto4 = new Producto("chicle", 500);
let producto5 = new Producto("chocolatina", 1000);

let orden1 = new Orden();
orden1.agregarProducto(producto1);
orden1.agregarProducto(producto2);
orden1.agregarProducto(producto3);
orden1.agregarProducto(producto4);
orden1.agregarProducto(producto5);
orden1.calcularTotal();
orden1.mostrarOrden();

console.log();

let orden2 = new Orden();
orden2.agregarProducto(new Producto("camisa", 20000))
orden2.agregarProducto(new Producto("pantalon", 70000))
orden2.calcularTotal();
orden2.mostrarOrden();