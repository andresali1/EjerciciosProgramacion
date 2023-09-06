import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado.model';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-edicion-component',
  templateUrl: './edicion-component.component.html',
  styleUrls: ['./edicion-component.component.css']
})
export class EdicionComponentComponent implements OnInit {
  title: string = 'Edición de empleados';
  subTitle: string = 'Formulario';
  mensaje: string = 'Se deben diligenciar todos los campos';
  mostrarMensaje: boolean = false;
  indice: number;
  empleadoEditar: Empleado;
  param: number;
  boton_accion:string = '';

  nombreEmpleado: string = '';
  apellidoEmpleado: string = '';
  cargoEmpleado: string = '';
  salarioEmpleado: number = 0;

  constructor(
    private router: Router,
    private datosServicio: DatosService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.indice = parseInt(this.route.snapshot.params['id']);
    this.param = this.route.snapshot.queryParams['accion'];
    this.boton_accion = this.param != 2 ? 'Editar' : 'Eliminar';

    try {
      this.empleadoEditar = this.datosServicio.encontrarEmpleado(this.indice);
      this.nombreEmpleado = this.empleadoEditar.nombre;
      this.apellidoEmpleado = this.empleadoEditar.apellido;
      this.cargoEmpleado = this.empleadoEditar.cargo;
      this.salarioEmpleado = this.empleadoEditar.salario;
    } catch (error) {
      this.volverHome();
    }
  }

  volverHome() {
    this.router.navigate(['']);
  }

  /*
  editarEmpleado() {
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

      this.datosServicio.editarEmpleado(this.indice, miEmpleado);

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

  eliminarEmpleado(){
    this.datosServicio.eliminarEmpleado(this.indice);
    this.volverHome();
  }
  */

  accion() {
    if (this.param != 2) {
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

        this.datosServicio.editarEmpleado(this.indice, miEmpleado);

        this.nombreEmpleado = '';
        this.apellidoEmpleado = '';
        this.cargoEmpleado = '';
        this.salarioEmpleado = 0;

        this.mostrarMensaje = false;
        this.volverHome();
      } else {
        this.mostrarMensaje = true;
      }
    } else {
      this.datosServicio.eliminarEmpleado(this.indice);
      this.volverHome();
    }
  }
}
