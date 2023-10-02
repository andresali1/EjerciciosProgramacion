import { Component } from '@angular/core';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css'],
})
export class PersonasComponent {
  boton_desabilitado: boolean = false;
  mensaje: string = 'No se ha agregado ninguna persona';

  agregarPersona(): void {
    this.mensaje = 'Persona agregada';
  }
}
