import { Component } from '@angular/core';

@Component({
  selector: 'app-style-class',
  templateUrl: './directivas-style-class.component.html',
  styleUrls: ['./directivas-style-class.component.css']
})
export class DirectivasStyleClassComponent {
  title: string = 'Directivas ngStyle y ngClass';
  subTitle: string = 'Registro de usuario';

  nombre: string = '';
  apellido: string = '';
  cargo: string = '';

  registrado:boolean = false;
  mensaje:string = '';

  registroPrueba() {
    if (this.nombre != '' && this.apellido != '' && this.cargo != '') {
      this.registrado = true;
      this.mensaje = `Usuario ${this.nombre} ${this.apellido} registrado con éxito`;
    } else {
      this.limpiar();
    }
  }

  limpiar() {
    this.nombre = '';
    this.apellido = '';
    this.cargo = '';
    this.registrado = false;
  }
}
