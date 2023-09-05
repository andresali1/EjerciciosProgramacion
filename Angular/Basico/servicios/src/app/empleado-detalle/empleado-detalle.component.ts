import { Component, EventEmitter, Output } from '@angular/core';
import { DatosEmpleadosService } from '../services/datos-empleados.service';

@Component({
  selector: 'app-empleado-detalle',
  templateUrl: './empleado-detalle.component.html',
  styleUrls: ['./empleado-detalle.component.css']
})
export class EmpleadoDetalleComponent {
  @Output() caracteristicasEmpleado = new EventEmitter<string>();

  constructor(private datosEmpleadoService:DatosEmpleadosService) {}

  agregaCaracteristicas(value:string){
    this.datosEmpleadoService.mostrarInfo(`Característica agregada: ${value}`);
    this.caracteristicasEmpleado.emit(value);
  }
}
