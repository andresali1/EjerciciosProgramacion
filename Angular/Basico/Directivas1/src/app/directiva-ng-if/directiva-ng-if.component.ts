import { Component } from '@angular/core';

@Component({
  selector: 'app-if',
  templateUrl: './directiva-ng-if.component.html',
  styleUrls: ['./directiva-ng-if.component.css']
})
export class DirectivaNgIfComponent {
  nombre: string = '';
  apellido: string = '';

  title: string = 'Directiva ngIf';
  subTitle: string = 'Registro de usuarios';
  mensaje: string = '';
  registrado: boolean = false;

  registroPrueba() {
    if (this.nombre != '' && this.apellido != '') {
      this.registrado = true;
      this.mensaje = `Usuario ${this.nombre} ${this.apellido} registrado con éxito`;
    } else {
      this.limpiar();
    }
  }

  limpiar() {
    this.nombre = '';
    this.apellido = '';
    this.registrado = false;
  }
}
