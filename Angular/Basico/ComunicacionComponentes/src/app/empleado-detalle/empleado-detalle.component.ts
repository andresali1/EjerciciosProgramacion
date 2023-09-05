import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-empleado-detalle',
  templateUrl: './empleado-detalle.component.html',
  styleUrls: ['./empleado-detalle.component.css']
})
export class EmpleadoDetalleComponent {
  @Output() caracteristicasEmpleado = new EventEmitter<string>();

  agregaCaracteristicas(value:string){
    this.caracteristicasEmpleado.emit(value);
  }
}
