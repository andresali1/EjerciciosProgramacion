import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado.model';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-creacion-component',
  templateUrl: './creacion-component.component.html',
  styleUrls: ['./creacion-component.component.css']
})
export class CreacionComponentComponent {
  title: string = 'Creación de empleados';
  subTitle: string = 'Formulario';
  mensaje: string = 'Se deben diligenciar todos los campos';
  mostrarMensaje: boolean = false;

  constructor(
    private router:Router,
    private datosServicio:DatosService
  ) {}

  volverHome(){
    this.router.navigate(['']);
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
      this.volverHome();
    } else {
      this.mostrarMensaje = true;
    }
  }
}
