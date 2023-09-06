import { Component, EventEmitter, Output } from '@angular/core';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-empleado-detalle',
  templateUrl: './empleado-detalle.component.html',
  styleUrls: ['./empleado-detalle.component.css']
})
export class EmpleadoDetalleComponent {
  @Output() caracteristicasEmpleado = new EventEmitter<string>();

  constructor(private datosEmpleadoService:DatosService) {}

  agregaCaracteristicas(value:string){
    this.datosEmpleadoService.mostrarInfo(`Característica agregada: ${value}`);
    this.caracteristicasEmpleado.emit(value);
  }
}
