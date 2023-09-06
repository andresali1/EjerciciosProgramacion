import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/empleado.model';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.css']
})
export class EmpleadoFormComponent implements OnInit {
  title: string = 'Angular Routing';
  subTitle: string = 'Listado de empleados';
  mensaje: string = 'Se deben diligenciar todos los campos';
  mostrarMensaje: boolean = false;

  empleados:Empleado[] = [];

  constructor(
    private datosServicio:DatosService
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
