import { Component } from '@angular/core';
import { Empleado } from '../models/empleado.model';

@Component({
  selector: 'app-practica1',
  templateUrl: './practica1.component.html',
  styleUrls: ['./practica1.component.css']
})
export class Practica1Component {
  title: string = 'Práctica 1';
  subTitle: string = 'Listado de empleados';
  mensaje: string = 'Se deben diligenciar todos los campos';
  mostrarMensaje: boolean = false;

  empleados: Empleado[] = [
    new Empleado('Camilo', 'Pérez', 'Analista', 1300),
    new Empleado('Camila', 'Torres', 'Asesor', 1000),
    new Empleado('Lorena', 'Ávila', 'Gerente', 5500),
    new Empleado('Fabiola', 'Domínguez', 'Profesional', 3000)
  ];

  nombreEmpleado: string = '';
  apellidoEmpleado: string = '';
  cargoEmpleado: string = '';
  salarioEmpleado: number = 0;

  agregarEmpleado() {
    if (
      this.nombreEmpleado != '' &&
      this.apellidoEmpleado != '' &&
      this.cargoEmpleado != '' &&
      this.salarioEmpleado > 0
    ) {
      let miEmpleado = new Empleado(
        this.nombreEmpleado,
        this.apellidoEmpleado,
        this.cargoEmpleado,
        this.salarioEmpleado
      );

      this.empleados.push(miEmpleado);

      this.nombreEmpleado = '';
      this.apellidoEmpleado = '';
      this.cargoEmpleado = '';
      this.salarioEmpleado = 0;

      this.mostrarMensaje = false;
    } else {
      this.mostrarMensaje = true;
    }
  }
}
