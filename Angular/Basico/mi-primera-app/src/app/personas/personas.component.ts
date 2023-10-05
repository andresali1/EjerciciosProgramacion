import { Component } from '@angular/core';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css'],
})
export class PersonasComponent {
  boton_desabilitado: boolean = false;
  mensaje: string = 'No se ha agregado ninguna persona';
  nacionalidad: string = 'NN';
  titulo: string = '';

  agregarPersona(): void {
    this.mensaje = 'Persona agregada';
  }

  modificarTitulo(event: Event) {
    this.titulo = (<HTMLInputElement>event.target).value;
  }
}
