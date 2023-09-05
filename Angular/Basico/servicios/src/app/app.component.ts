import { Component, OnInit } from '@angular/core';
import { Empleado } from './models/empleado.model';
import { DatosEmpleadosService } from './services/datos-empleados.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'Práctica 1';
  subTitle: string = 'Listado de empleados';
  mensaje: string = 'Se deben diligenciar todos los campos';
  mostrarMensaje: boolean = false;

  empleados:Empleado[] = [];

  constructor(
    private datosServicio:DatosEmpleadosService
  ) {}

  ngOnInit(): void {
    this.empleados = this.datosServicio.empleados;
  }

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

      this.datosServicio.agregarEmpleado(miEmpleado);

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
