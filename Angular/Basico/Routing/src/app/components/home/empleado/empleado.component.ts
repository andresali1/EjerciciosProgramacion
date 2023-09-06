import { Component, Input } from '@angular/core';
import { Empleado } from 'src/app/models/empleado.model';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent {
  @Input() empleado:Empleado;
  @Input() i:number;

  arrayCaracteristicas:string[] = [];

  agregarCaracteristica(valor:string){
    this.arrayCaracteristicas.push(valor);
  }
}
