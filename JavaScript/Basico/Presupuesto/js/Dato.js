class Dato {
  constructor(descripcion, valor) {
    this._descripcion = descripcion;
    this._valor = valor;
  }

  get Descripcion() {
    return this._descripcion;
  }

  set Descripcion(descripcion) {
    this._descripcion = descripcion;
  }

  get Valor() {
    return this._valor;
  }

  set Valor(valor) {
    this._valor = valor;
  }
}
